const https = require('https') // or 'https' for https:// URLs
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffprobePath = require('@ffprobe-installer/ffprobe').path
// https://github.com/n0l3r/tiktok-downloader/blob/main/index.js
let puppeteer = require('puppeteer')
let {
  addTikTokIfNotExists,
  getRandomTikTokByAuthor,
  setTikTokAsUsed
} = require('../services/tiktok')
let YoutubeAccount = require('../models/YoutubeAccount')
let axios = require('axios-https-proxy-fix')
let Short = require('../models/Short')
let User = require('../models/User')
let cron = require('node-cron')
let moment = require('moment')

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);


const getIdVideo = (url) => {
  try {
    const pattern = /\/(\d+)\/?$/;
    const match = url.match(pattern);
    if (match) {
      return match[1];
    } else {
      return null;
    }
  } catch (e) {
    throw new Error(e)
  }
}



const getVideoNoWM = async (url) => {

  try {

    const idVideo = await getIdVideo(url)
    console.log(`[${moment().format('MMMM Do YYYY, h:mm:ss a')}] extracted id ${idVideo} for ${url}`)
    const API_URL = `https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${idVideo}`;
    console.log(`[${moment().format('MMMM Do YYYY, h:mm:ss a')}] aweme api url: ${API_URL}`)

    const resp = await axios.get(API_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15'
      },
      proxy: {
        protocol: 'http',
        host: process.env.PROXY_HOST,
        port: process.env.PROXY_PORT,
        auth: {
          username: process.env.PROXY_USERNAME,
          password: process.env.PROXY_PASSWORD
        }
      }
    });

    const urlMedia = resp.data.aweme_list[0].video.play_addr.url_list[0]
    console.log("🚀 ~ file: shorts.js:62 ~ getVideoNoWM ~ urlMedia:", urlMedia)

    const data = {
      url: urlMedia,
      id: idVideo
    }
    return data

  } catch (e) {
    throw new Error(e)
  }

}


async function scrapeFromTikTok(user) {

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });


  try {


    // Create a new page
    const page = await browser.newPage();

    // Go to the TikTok user's profile
    await page.goto(`https://www.tiktok.com/@${user}`)

    page.waitForSelector('a[id="verify-bar-close"]').then(() => {
      page.click('a[id="verify-bar-close"]')
    }).catch(() => {})

    await page.waitForSelector('div[data-e2e="user-post-item-list"]')

    // Wait for the user's profile to load
    let data = await page.evaluate((username) => {
      let obj = []
      document.querySelectorAll('div[data-e2e="user-post-item-desc"]').forEach((post) => {

        obj.push({
          description: post.getAttribute('aria-label'),
          link: post.children[0].getAttribute('href'),
          author: username
        })

      })
      return obj
    }, user)

    for await (let tikTok of data) {
      await addTikTokIfNotExists(tikTok)
    }

    return data

  } catch (e) {
    throw new Error(e)
  } finally {
    await browser.close()
  }

}

async function downloadTiktokToFile(tiktokUrl) {
  return new Promise(async (resolve, reject) => {
    try {

      let downloadLink = await getVideoNoWM(tiktokUrl)

      downloadLink = downloadLink.url

      let fileName = Date.now() + '.mp4'
      const file = fs.createWriteStream(fileName);

      https.get(downloadLink, function (response) {
        response.pipe(file);

        file.on("finish", () => {
          file.close();

          resolve(fileName)

        })
      })
    } catch (e) {
      reject('Error while downloading TikTok to file: ' + e)
    }
  })
}

function deleteFileIfExists(filePath) {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File "${filePath}" does not exist.`);
    } else {
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Error deleting "${filePath}":`, unlinkErr);
        } else {
          console.log(`File "${filePath}" deleted successfully.`);
        }
      });
    }
  });
}

// https://stackoverflow.com/questions/40014785/node-js-ffmpeg-complexfilter-overlay-another-video
async function editVideo(pathToTiktok, backgroundVideo, foundYoutubeAccount) {
  return new Promise((resolve, reject) => {
    try {

      let getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
      }


      ffmpeg.ffprobe(backgroundVideo, (err, metadata) => {

        if (err) console.log("🚀 ~ file: shorts.js:108 ~ ffmpeg.ffprobe ~ err:", err)

        const duration = metadata.format.duration;
        const start = getRandomInt(duration - 60);
        const outputName = Date.now() + '.mp4'

        ffmpeg()
          .input(backgroundVideo).setStartTime(start)
          .input(pathToTiktok)
          .complexFilter([
            '[0:v]scale=1080:1920[0scaled]',
            '[0scaled]setsar=1[0aspect]',
            '[1:v]scale=576:1024[1scaled]',
            '[0aspect]pad=1080:1920[0padded]',
            '[0padded][1scaled]overlay=shortest=1[outv]',
          ])
          .outputOptions([
            '-map [outv]',
            '-map 1:a'
          ])
          .output(process.env.DEFAULT_OUTPUT_PATH + outputName)
          .on("error", (er) => {
            console.log("[FFMPEG] Error occured: " + er.message)

            foundYoutubeAccount.last_log = er.message
            foundYoutubeAccount.save()

            throw new Error(er.message)
          })
          .on("end", () => {

            // deletes downloaded tiktok clip
            fs.unlinkSync(pathToTiktok)

            resolve(outputName)

          })
          .run();
      });

    } catch (e) {
      deleteFileIfExists(pathToTiktok)
      reject('Error while editing TikTok: ' + e)
    }

  })
}

async function uploadShortToYoutube(event_trigger_url, path, title, description, pinnedComment, hashtags) {
  try {

    // youtube title has only 100 chars limit, so we cut the title to the last complete word
    function limitStringToLastWord(inputString, maxLength) {
      if (inputString.length <= maxLength) {
        return inputString;
      } else {
        const trimmedString = inputString.substring(0, maxLength);
        const lastSpaceIndex = trimmedString.lastIndexOf(' ');
        if (lastSpaceIndex !== -1) {
          return trimmedString.substring(0, lastSpaceIndex);
        } else {
          // If there are no spaces, just return the trimmed string
          return trimmedString;
        }
      }
    }

    if (hashtags) {
      title = title + ' ' + hashtags
    }

    title = limitStringToLastWord(title, 100)

    let response = await axios.post(event_trigger_url, {
      title,
      description,
      video: process.env.HOST + '/' + path
      // video: 'http://shortscreation.tech/1691418605957.mp4'
    })

    await fs.unlinkSync(process.env.DEFAULT_OUTPUT_PATH + path)

    if (!response.data.video) {
      return {
        success: false
      }
    }

    return response.data.video

  } catch (e) {
    deleteFileIfExists(process.env.DEFAULT_OUTPUT_PATH + path)
    throw new Error(e)
  }


}

async function generateAndUploadShort(youtubeAccountId) {
  try {
    console.log(`[${moment().format('MMMM Do YYYY, h:mm:ss a')}] started for #${youtubeAccountId}`)
    let getRandomElementFromArray = (array) => {
      if (array.length === 0) {
        return undefined; // Return undefined if the array is empty
      }

      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }

    let foundYoutubeAccount = await YoutubeAccount.findById(youtubeAccountId)

    if (!foundYoutubeAccount) {
      throw new Error('No youtube account found in DB')
    }

    let tiktokAccounts = foundYoutubeAccount.tiktok_accounts
    let backgroundVideo = foundYoutubeAccount.background_video

    if (!backgroundVideo) {
      foundYoutubeAccount.credentials_valid = false
      foundYoutubeAccount.last_log = 'No background video provided'
      foundYoutubeAccount.save()
      throw new Error('No background video provided')
    }

    if (!foundYoutubeAccount.settings.title || !foundYoutubeAccount.settings.description) {
      foundYoutubeAccount.credentials_valid = false
      foundYoutubeAccount.last_log = 'No title / description provided'
      foundYoutubeAccount.save()
      throw new Error('No title / description provided')
    }

    let {
      title,
      description,
      pinnedComment
    } = foundYoutubeAccount.settings


    let randomTikTokAccount = getRandomElementFromArray(tiktokAccounts)

    if (!randomTikTokAccount) {
      foundYoutubeAccount.credentials_valid = false
      foundYoutubeAccount.last_log = 'No tiktok accounts to scrape from provided'
      foundYoutubeAccount.save()
      throw new Error('No tiktok accounts to scrape from provided')
    }

    let randomTikTokInDb = await getRandomTikTokByAuthor(randomTikTokAccount, foundYoutubeAccount)

    if (foundYoutubeAccount.use_tiktok_title && randomTikTokInDb.description !== "") {
      title = randomTikTokInDb.description
    }

    if (foundYoutubeAccount.settings.hashtags) {
      var hashtags = foundYoutubeAccount.settings.hashtags
    }

    let fileName = await downloadTiktokToFile(randomTikTokInDb.link)
    console.log('[generating] tiktok downloaded: ' + randomTikTokInDb.link)

    let output = await editVideo(fileName, backgroundVideo, foundYoutubeAccount)

    console.log('[generating] video edited: ' + output)

    let link = await uploadShortToYoutube(foundYoutubeAccount.event_trigger_url, output, title, description, pinnedComment, hashtags)
      .catch(async (e) => {

        foundYoutubeAccount.credentials_valid = false
        foundYoutubeAccount.last_log = 'Error occured while uploading tiktok' + e
        await foundYoutubeAccount.save()
        throw new Error(e)

      })

    if (link.success === false) {
      foundYoutubeAccount.last_log = 'Error occured while uploading tiktok'
      await foundYoutubeAccount.save()

      throw new Error('Error occured')
    }

    foundYoutubeAccount.credentials_valid = true
    await foundYoutubeAccount.save()

    await setTikTokAsUsed(randomTikTokInDb.id)

    let newShort = new Short({
      user_id: foundYoutubeAccount.user_id,
      youtube_account_id: foundYoutubeAccount.id,
      author: randomTikTokAccount,
      link: link,
    })

    let savedShort = await newShort.save();

    foundYoutubeAccount.last_log = 'Video successfully uploaded!'
    await foundYoutubeAccount.save()

    return savedShort

  } catch (error) {
    throw new Error('Generating Tiktok:' + error)
  } finally {
    let foundYoutubeAccount = await YoutubeAccount.findById(youtubeAccountId)

    if (!foundYoutubeAccount) {
      foundYoutubeAccount.last_log = 'No youtube account found in DB'
      foundYoutubeAccount.save()
      throw new Error('No youtube account found in DB')
    }

  }

};

cron.schedule('*/30 * * * *', async () => {
  try {
    console.log(`[${moment().format('MMMM Do YYYY, h:mm:ss a')}] started process`)

    function mergeArraysWithoutDuplicates(arr1, arr2) {
      // Merge the two arrays using concat
      const mergedArray = arr1.concat(arr2);

      // Create a Set from the merged array to remove duplicates
      const uniqueSet = new Set(mergedArray);

      // Convert the Set back to an array
      const mergedWithoutDuplicates = Array.from(uniqueSet);

      return mergedWithoutDuplicates;
    }

    let youtubeAccounts = await YoutubeAccount.find().populate('user_id')

    let now = moment(new Date())
    let tiktoks = []
    let nowInDateFormat = Date.now()


    let uploadingAccounts = youtubeAccounts.filter((account) => {

      let uploadIntervalInMs = account.settings.uploadInterval * 60 * 60 * 1000
      let uploadTime = moment(account.last_upload)

      let timePassed = moment.duration(now.diff(uploadTime))

      if (timePassed - 5 * 60 * 1000 >= uploadIntervalInMs && account.user_id?.subscription?.has_subscription === true) {
        account.last_upload = nowInDateFormat
        account.save()

        console.log(`[${moment().format('MMMM Do YYYY, h:mm:ss a')}] #${account.id} last_upload updated. starting to generate for this account'`)
        return true
      }
      return false

    })

    console.log(`[${moment().format('MMMM Do YYYY, h:mm:ss a')}] uploading for ${uploadingAccounts.length} accounts`)

    for await (account of uploadingAccounts) {

      tiktoks = mergeArraysWithoutDuplicates(tiktoks, account.tiktok_accounts)

      await generateAndUploadShort(account.id).then((res) => {
        console.log(`[${moment().format('MMMM Do YYYY, h:mm:ss a')}] successfully generated & uploaded`)
      }).catch((e) => {
        console.log(`[${moment().format('MMMM Do YYYY, h:mm:ss a')}] error occured while generating/uploaded: ${e}`)
      })

    }


    // for await (tiktok of tiktoks) {

    //   await scrapeFromTikTok(tiktok).catch(() => {

    //   })

    // }

    // remove subscription
    // from all users whose subscription expire
    let users = await User.find({
      'subscription.has_subscription': true
    })

    users.forEach((user) => {
      if (Date.now() - new Date(user.subscription.expires).getTime() >= 0) {
        user.subscription.has_subscription = false
        user.save()
      }
    })



  } catch (e) {
    console.log('[cron] error, ' + e)
  }

});

module.exports = {
  scrapeFromTikTok,
  downloadTiktokToFile,
  editVideo,
  uploadShortToYoutube,
  generateAndUploadShort
}
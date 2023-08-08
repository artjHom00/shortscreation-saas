const https = require('https') // or 'https' for https:// URLs
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffprobePath = require('@ffprobe-installer/ffprobe').path
let { upload, comment } = require('youtube-videos-uploader')
// https://github.com/n0l3r/tiktok-downloader/blob/main/index.js
const fetch = require('node-fetch');
let puppeteer = require('puppeteer')
let { addTikTokIfNotExists, getRandomTikTokByAuthor, setTikTokAsUsed } = require('../services/tiktok')
let YoutubeAccount = require('../models/YoutubeAccount')
let Short = require('../models/Short')
let User = require('../models/User')
let cron = require('node-cron')
let moment = require('moment')



ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);


const getIdVideo = (url) => {
  try {
    const matching = url.includes("/video/")
    if(!matching){
        console.log(chalk.red("[X] Error: URL not found"));
        exit();
    }
    const idVideo = url.substring(url.indexOf("/video/") + 7, url.length);
    return (idVideo.length > 19) ? idVideo.substring(0, idVideo.indexOf("?")) : idVideo;
  } catch(e) {
      throw new Error(e)
  }
}



const getVideoNoWM = async (url) => {

  const idVideo = await getIdVideo(url)
  const API_URL = `https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${idVideo}`;

  const request = await fetch(API_URL, {
      method: "GET",
      headers : headers
  });

  const body = await request.text();

  try {
    var res = JSON.parse(body);
  } catch (err) {
      console.error("Error:", err);
      console.error("Response body:", body);
  }
  const urlMedia = res.aweme_list[0].video.play_addr.url_list[0]
  const data = {
      url: urlMedia,
      id: idVideo
  }
  return data

}


async function scrapeFromTikTok(user) {
  
  const browser = await puppeteer.launch({
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

  } catch(e) {
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
  
      https.get(downloadLink, function(response) {
        response.pipe(file);
        
        file.on("finish", () => {
            file.close();
            
            resolve(fileName) 
            
        })
      })
    } catch(e) {
      reject('Error while downloading TikTok to file: ' + e)
    }
  })
}

// https://stackoverflow.com/questions/40014785/node-js-ffmpeg-complexfilter-overlay-another-video
async function editVideo(pathToTiktok, backgroundVideo) {
  return new Promise((resolve, reject) => {
    try {

      let getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
      }
      
    
      ffmpeg.ffprobe(backgroundVideo, (err, metadata) => {

        if(err) console.log("🚀 ~ file: shorts.js:108 ~ ffmpeg.ffprobe ~ err:", err)
        
        const duration = metadata.format.duration;
        const start = getRandomInt(duration-60);
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
          console.log("error occured: " + er.message);
        })
        .on("end", () => {
          
          // deletes downloaded tiktok clip
          fs.unlinkSync(pathToTiktok)

          resolve(process.env.DEFAULT_OUTPUT_PATH + outputName)

        })
        .run();
      });

    } catch(e) {
      reject('Error while editing TikTok: ' + e)
    }

    })
}

async function uploadShortToYoutube(credentials, path, title, description, pinnedComment) {
  try {
    function replaceShortsURL(url) {
      const replacedURL = url.replace("youtube.com/shorts/", "youtube.com/watch?v=");
      return replacedURL;
    }

    const video = { 
      path: path,
      title: title,
      isAgeRestriction: false,
      isNotForKid: true,
      description: description
    }

    let link = await upload(credentials, [video], {
      // headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    })

    if(pinnedComment && pinnedComment !== '') {
      const commentInfo = { link: replaceShortsURL(link[0]), comment: pinnedComment, pin: true }

      await comment(credentials, [commentInfo], {
        // headless: false,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      })  

    }

    await fs.unlinkSync(video.path)

    return link

  } catch(e) {

    throw new Error(e)
  }
    

}

async function generateAndUploadShort(youtubeAccountId) {
  try {
    console.log('started for', youtubeAccountId)
    let getRandomElementFromArray = (array) => {
      if (array.length === 0) {
        return undefined; // Return undefined if the array is empty
      }
      
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }
      
    let foundYoutubeAccount = await YoutubeAccount.findById(youtubeAccountId)

    if(!foundYoutubeAccount) {
        foundYoutubeAccount.last_log = 'No youtube account found in DB'
        foundYoutubeAccount.save()
        throw new Error('No youtube account found in DB')
    }

    let tiktokAccounts = foundYoutubeAccount.tiktok_accounts
    let backgroundVideo = foundYoutubeAccount.background_video
    
    if(!backgroundVideo) {
      foundYoutubeAccount.last_log = 'No background video provided'
      foundYoutubeAccount.save()
      throw new Error('No background video provided')
    }
    
    let { title, description, pinnedComment } = foundYoutubeAccount.settings
  
    let credentials = {
      email: foundYoutubeAccount.email,
      pass: foundYoutubeAccount.password,
      recoveryemail: foundYoutubeAccount.recovery_email
    }
    
    let randomTikTokAccount = getRandomElementFromArray(tiktokAccounts)
    
    if(!randomTikTokAccount) {
      foundYoutubeAccount.last_log = 'No tiktok accounts to scrape from provided'
      foundYoutubeAccount.save()
      throw new Error('No tiktok accounts to scrape from provided')
    }

    let randomTikTokInDb = await getRandomTikTokByAuthor(randomTikTokAccount, scrapeFromTikTok)

    let fileName = await downloadTiktokToFile(randomTikTokInDb.link)
    let output = await editVideo(fileName, backgroundVideo)

    console.log('Video edited, ' + output)
    
    let link = await uploadShortToYoutube(credentials, output, title, description, pinnedComment)
    .catch(async (e) => {

      foundYoutubeAccount.credentials_valid = false
      foundYoutubeAccount.last_log = 'Error occured while uploading tiktok' + e
      await foundYoutubeAccount.save()
      throw new Error(e)
      
    })
    foundYoutubeAccount.credentials_valid = true
    await foundYoutubeAccount.save()

    await setTikTokAsUsed(randomTikTokInDb.id)

    let newShort = new Short({
      user_id: foundYoutubeAccount.user_id,
      youtube_account_email: foundYoutubeAccount.email,
      author: randomTikTokAccount,
      link: link[0],
    })

    let savedShort = await newShort.save();
    
    foundYoutubeAccount.last_log = 'Video successfully uploaded!'
    await foundYoutubeAccount.save()

    return savedShort
          
  } catch(error) {
    throw new Error('Generating Tiktok:' + error)
  } finally {
    let foundYoutubeAccount = await YoutubeAccount.findById(youtubeAccountId)

    if(!foundYoutubeAccount) {
        foundYoutubeAccount.last_log = 'No youtube account found in DB'
        foundYoutubeAccount.save()
        throw new Error('No youtube account found in DB')
    }

    foundYoutubeAccount.last_upload = Date.now()
    await foundYoutubeAccount.save()

  }

};

cron.schedule('*/30 * * * *', async () => { 
    try {
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
    
      let youtubeAccountsOfUsersWithSubscription = youtubeAccounts.filter((obj) => {
        return obj.user_id?.subscription?.has_subscription === true
      });
    
      let now = moment(new Date())
      let tiktoks = []

      for await(account of youtubeAccountsOfUsersWithSubscription) {

        tiktoks = mergeArraysWithoutDuplicates(tiktoks, account.tiktok_accounts)
        
        let uploadIntervalInMs = account.settings.uploadInterval*60*60*1000
        let uploadTime = moment(account.last_upload)
        
        let timePassed = moment.duration(now.diff(uploadTime))
        
        if(timePassed >= uploadIntervalInMs) {
          await generateAndUploadShort(account.id).then((res) => {
          console.log("🚀 ~ file: shorts.js:308 ~ awaitgenerateAndUploadShort ~ res:", res)
          }).catch((e) => {
          console.log("🚀 ~ file: shorts.js:296 ~ youtubeAccountsOfUsersWithSubscription.forEach ~ e:", e)

          })
        }

      }
  
      for await (tiktok of tiktoks) {

        await scrapeFromTikTok(tiktok).catch(() => {
          
        })
        
      }
      
      // remove subscription
      // from all users whose subscription expire
      let users = await User.find({
        'subscription.has_subscription': true
      })
            
      users.forEach((user) => {
        if(Date.now() - new Date(user.subscription.expires).getTime() >= 0) {
          user.subscription.has_subscription = false
          user.save()
        }
      })

      
      
    } catch(e) {
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
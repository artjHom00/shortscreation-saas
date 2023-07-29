const https = require('https') // or 'https' for https:// URLs
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffprobePath = require('@ffprobe-installer/ffprobe').path
let { upload } = require('youtube-videos-uploader')
const { TiktokDL } = require("@tobyg74/tiktok-api-dl")
let puppeteer = require('puppeteer')
let { addTikTokIfNotExists, getRandomTikTokByAuthor, setTikTokAsUsed } = require('../services/tiktok')
let YoutubeAccount = require('../models/YoutubeAccount')
let Short = require('../models/Short')
let cron = require('node-cron')



ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);


async function scrapeFromTikTok(user) {
  try {

    const browser = await puppeteer.launch({
      headless: false
    });

    // Create a new page
    const page = await browser.newPage();
      
    // Go to the TikTok user's profile
    await page.goto(`https://www.tiktok.com/@${user}`)

    page.waitForSelector('a[id="verify-bar-close"]').then(() => {
        page.click('a[id="verify-bar-close"]')
    })
    
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

    await browser.close()
    
    return data

  } catch(e) {
    throw new Error('Error while scraping TikTok: ' + e)
  }

}

async function downloadTiktokToFile(tiktokUrl) {
  return new Promise(async (resolve, reject) => {
    try {

      let { result: { video: downloadLink } } = await TiktokDL(tiktokUrl)
      downloadLink = downloadLink[0]
      
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
      reject('Error while downloading TikTok to file: ', e)
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

async function uploadShortToYoutube(credentials, path, title, description) {
  try {

    const video = { 
      path: path,
      title: title,
      isAgeRestriction: false,
      isNotForKid: true,
      description: `Веселый контент здесь! 
Лучшие видео из тик-тока. Подписывайся чтобы не пропустить! ✅`
    }

    let link = await upload(credentials, [video], {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    })
    await fs.unlinkSync(video.path)

    return link

  } catch(e) {

    throw new Error('Error while uploading short to youtube: ' + e)
  }
    

}

async function generateAndUploadShort(youtubeAccountId) {
  try {

    let getRandomElementFromArray = (array) => {
      if (array.length === 0) {
        return undefined; // Return undefined if the array is empty
      }
      
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }
      
    let foundYoutubeAccount = await YoutubeAccount.findById(youtubeAccountId)

    if(!foundYoutubeAccount) {
        throw new Error('No youtube account found in DB')
    }

    let tiktokAccounts = foundYoutubeAccount.tiktok_accounts
    let backgroundVideo = foundYoutubeAccount.background_video
    
    if(!backgroundVideo) {
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
      throw new Error('No tiktok accounts to scrape from provided')
    }

    let randomTikTokInDb = await getRandomTikTokByAuthor(randomTikTokAccount, scrapeFromTikTok)

    let fileName = await downloadTiktokToFile(randomTikTokInDb.link)
    let output = await editVideo(fileName, backgroundVideo)
    
    let link = await uploadShortToYoutube(credentials, output, title, description)
    .catch(async (e) => {

      foundYoutubeAccount.credentials_valid = false
      await foundYoutubeAccount.save()
      throw new Error('Error occured while uploading tiktok' + e)
      
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

    return savedShort
          
  } catch(error) {
      throw new Error('Generating Tiktok:' + error)
  }

};

// cron.schedule('')


module.exports = {
  scrapeFromTikTok,
  downloadTiktokToFile,
  editVideo,
  uploadShortToYoutube,
  generateAndUploadShort
}
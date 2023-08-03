let { scrapeFromTikTok } = require('./providers/shorts')
let YoutubeAccount = require('../models/YoutubeAccount')
let mongoose = require('mongoose')

if (process.env.DB_URL) {
    mongoose.connect(process.env.DB_URL).then(() => {
      console.log('[success] connected to db')

    // let { generateAndUploadShort } = require('./providers/shorts')  

    
    // generateAndUploadShort('64c631bbf8a64ad0565c45fc').then((res) => {
    //   console.log("🚀 ~ file: index.js:33 ~ generateAndUploadShort ~ res:", res)
    // }).catch(err => {
    //   console.log("🚀 ~ file: index.js:34 ~ generateAndUploadShort ~ err:", err)
      
    // })

    }).catch((err) => {
      console.log('[fail] connection to db failed', err)
    })
  } else {
    console.log('Specify DB connection');
  }

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

  let tiktoks = []

  for await(account of youtubeAccountsOfUsersWithSubscription) {

    tiktoks = mergeArraysWithoutDuplicates(tiktoks, account.tiktok_accounts)

  }

for await (tiktok of tiktoks) {

    await scrapeFromTikTok(tiktok).then(() => {
        console.log(tiktok + 'succesfully parsed!')
    }).catch(() => {
        console.log(tiktok + 'error while parsing!')
    })
}
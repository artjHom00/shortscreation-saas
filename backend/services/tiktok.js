let TikTok = require('../models/TikTok')

async function addTikTokIfNotExists(data) {
    try {
        // Check if the tikTok already exists
        const existingtikTok = await TikTok.findOne({
            link: data.link
        });

        if (existingtikTok) {
            return {
                error: 'TikTok already exists'
            };
        }

        const newtikTok = new TikTok(data);
        const savedtikTok = await newtikTok.save();

        return savedtikTok;
    } catch (error) {

        throw new Error('Adding Tiktok to DB:' + error);
    }
}

async function getRandomTikTokByAuthor(author, foundYoutubeAccount) {
    const count = await TikTok.countDocuments({
        author,
        is_used: false
    });

    if (count === 0) {
        foundYoutubeAccount.last_log = 'No tiktoks parsed!'
        foundYoutubeAccount.credentials_valid = false
        foundYoutubeAccount.save()

        throw new Error('No tiktoks available!')
    }

    const randomIndex = Math.floor(Math.random() * count);

    const randomTikTok = await TikTok.findOne({
        author,
        is_used: false
    }).skip(randomIndex);

    return randomTikTok;
}

async function setTikTokAsUsed(id) {
    try {

        await TikTok.findByIdAndUpdate(id, {
            is_used: true
        })
        return true

    } catch (e) {
        return false
    }
}

module.exports = {
    addTikTokIfNotExists,
    getRandomTikTokByAuthor,
    setTikTokAsUsed
}
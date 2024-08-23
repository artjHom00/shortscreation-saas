// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
// let sha256 = require('sha256')
let jwt = require('jsonwebtoken')
let User = require('../models/User')


async function generateAccessToken(user) {
    try {
        // password = sha256(password)

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            subscription: user.subscription,
            registration_date: user.registration_date
        }, process.env.JWT_SECRET, {
            expiresIn: '604800s'
        });

        let userData = await User.findByIdAndUpdate(user.id, {
            jwt_token: token
        }, {
            new: true
        })

        return userData
    } catch (error) {
        throw new Error(error)
    }
}

async function verifyCryptoCloudToken(token) {
    try {
        jwt.verify(token, process.env.SECRET_CRYPTOCLOUD, (err, data) => {
            if (err) throw new Error(err)

            return data
        });
    } catch (error) {
        throw new Error(error)
    }
}

// middleware
async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send(err);

        req.user = user;

        next();
    });
}

module.exports = {
    generateAccessToken,
    authenticateToken,
    verifyCryptoCloudToken
}
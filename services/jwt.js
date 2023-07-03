// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
// let sha256 = require('sha256')
let jwt = require('jsonwebtoken')

let User = require('../models/User')

async function generateAccessToken(user) {
    try {
        // password = sha256(password)
        
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '604800s' });

        let userData = await User.findByIdAndUpdate(user.id, {
            jwt_token: token
        }, { new: true })
            
        resolve(userData)
    } catch(error) {
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
}
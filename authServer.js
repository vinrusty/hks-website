const jwt = require('jsonwebtoken')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5m'})
}

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
})

app.post('/login', (req, res) => {
    const { userid, password } = req.body

    const user = {
        userid: userid,
        password: password
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.json({
        accessToken,
        refreshToken
    })

})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null){
        return res.status(400).json('you dont have access')
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json("you dont have access")
        req.user = user
        next()
    })
}
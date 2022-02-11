const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()
const Member = require('./models/Member')
const Prefect = require('./models/Users')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const User = require('./models/Users')
const Ration = require('./models/Ration')


dotenv.config()

try{
    mongoose.connect(process.env.URL,
    {useNewUrlParser: true, useUnifiedTopology: true},
        () => {
            console.log('connected to the database!')
        }
    )
}
catch(e){
    console.log("coudn't connect :(")
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    credentials: true
}))
app.use(session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser('secretcode'))
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport)

app.post('/register', async(req, res) => {
    const member = new Member(req.body)
    try{
        const newMember = await member.save();
        res.json(newMember);
    }
    catch(err){
        res.status(400).json('could not register')
    }
})

app.post('/create-user', (req, res) => {
    User.findOne({userid: req.body.userid}, async(err, doc) => {
        if(err){
            throw err
        }
        if(doc){
            res.json('User already exists')
        }
        if(!doc){
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = new User({
                name: req.body.name,
                userid: req.body.userid,
                phone: req.body.phone,
                password: hashedPassword,
                role: req.body.role
            })
            await newUser.save()
            res.json(newUser)
        }
    })
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            throw err
        }
        if(!user){
            res.status(403).json('no user found')
        }
        else{
            req.logIn(user, (err) => {
                if(err){
                    throw err
                }
                res.json(user)
            })
        }
    })(req, res, next)
})

app.get('/dashboard/:id',(req, res) => {
    const {id} = req.params
    User.findOne({userid: id}, (err, user)=>{
        if(err) throw err;
        if(!user){
            res.status(403).json('no user exists')
        }
        if(user){
            res.json(user)
        }
    })
})

app.post('/create-prefect', async(req, res) => {
    const prefect = new Prefect(req.body)
    try{
        const newPrefect = await prefect.save();
        res.json(newPrefect)
    }
    catch(err){
        res.status(400).json('couldnt add')
    }
})

app.get('/list-of-members', async(req, res) => {
    try{
        const fetchedMember = await Member.find({})
        res.json(fetchedMember)
    }
    catch(err){
        res.status(400).json('no data :{')
    }
})

app.get('/members', async(req, res) => {
    try{
        const members = await Member.find({});
        res.json(members);
    }
    catch(err){
        res.status(400).json('could not fetch members')
    }
})

app.post('/create-ration-list', async(req, res) => {
    const newRation = new Ration(req.body)
    try{
        const ration = await newRation.save()
        res.json(ration)
    }
    catch(err){
        res.status(400).json("could not register!")
    }
})
app.get('/create-ration-list', async(req, res) => {
    try{
        const ration = await Ration.find({});
        res.json(ration);
    }
    catch(err){
        res.status(400).json('could not fetch ration')
    }
})
app.get('/create-ration-list/:id', (req, res) => {
    const { id } = req.params
    Ration.findOne({date: id}, (err, ration) => {
        if(err){
            throw err
        }
        if(!ration){
            res.status(400).json('no ration found')
        }
        else{
            res.json(ration)
        }
    })
})

app.put('/create-ration-list', async(req, res) => {

})

app.listen('3001', ()=>{
    console.log('listening at 3001')
})
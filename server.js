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
const PersonalDetail = require('./models/PersonalDetails')
const PrefectAccount = require('./models/PrefectAccount')
const JuniorPrefectAccount = require('./models/JuniorPrefectAccount')
const multer = require('multer')
const uploads = multer({dest: 'uploads/'})
const jwt = require('jsonwebtoken')
const RefreshToken = require('./models/RefreshTokens')


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
app.use(cors({origin: 'https://hks-website-7f1d3.web.app',
}));
app.use(session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser('secretcode'))
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport)

app.get('/', (req,res)=>{
    res.send('hello')
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS")
})

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

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, "mySecretKey", (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
  
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated!");
    }
  };

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", {
      expiresIn: "15m",
    });
  };
  
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};

app.post('/login', (req, res, done) => {
    const {userid, password} = req.body
    User.findOne({userid: userid}, (err, user) => {
        if(err){
            throw(err)
        }
        if(!user){
            res.status(400).json('no user')
        }
        else{
            bcrypt.compare(password, user.password, (err, result) => {
                if(err) throw err
                if(result === true){
                    const accessToken = generateAccessToken(user);
                    const refreshToken = generateRefreshToken(user);
                    const newRefreshToken = new RefreshToken({
                        refreshToken: refreshToken
                    })
                    newRefreshToken.save()
                    res.json({
                        name: user.name,
                        userid: user.userid,
                        phone: user.phone,
                        role: user.role,
                        accessToken,
                        refreshToken,
                    })
                }
                else{
                    res.status(400).json('incorrect userid or password')
                }
            })
        }
    })
})

app.post('/logout', verify, async(req, res) => {
    const token = req.body.token
    await RefreshToken.deleteOne({refreshToken: token})
    res.json('success')
})

// app.get('/dashboard/:id',(req, res) => {
//     const {id} = req.params
//     User.findOne({userid: id}, (err, user)=>{
//         if(err) throw err;
//         if(!user){
//             res.status(403).json('no user exists')
//         }
//         if(user){
//             res.json(user)
//         }
//     })
// })

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

app.put('/create-ration-list/:date', async(req, res) => {
    const { date } = req.params
    try{
        const updatedRation = await Ration.findOneAndUpdate({date: date},req.body)
        res.json(updatedRation)
    }
    catch(err){
        res.status(400).json("couldn't update")
    }
})

app.post('/personal-details', async(req, res) => {
    const personalDetail = new PersonalDetail(req.body)
    try{
        const newPersonalDetail = await personalDetail.save();
        res.json(newPersonalDetail);
    }
    catch(err){
        res.status(400).json('could not register')
    }
})
app.post('/prefect-account', async(req, res) => {
    const prefectAccount = new PrefectAccount(req.body)
    try{
        const newPrefectAccount = await prefectAccount.save();
        res.json(newPrefectAccount);
    }
    catch(err){
        res.status(400).json('could not register')
    }
})
app.patch('/prefect-account/:id', async(req, res) => {
    const {id} = req.params
    try{
        const updatedAccount = await PrefectAccount.findOne({month: id})
        Object.assign(updatedAccount, req.body)
        updatedAccount.save()
        res.json(updatedAccount)
    }
    catch(err){
        res.status(400).json('could not add')
    }
})
app.get('/prefect-account/:id', (req, res) => {
    const {id} = req.params
    PrefectAccount.findOne({month: id}, (err, account) => {
        if(err){
            throw err
        }
        if(!account){
            res.status(400).json('no account found')
        }
        else{
            res.json(account)
        }
    })
})
app.get('/prefect-account', async(req, res) => {
    try{
        const accounts = await PrefectAccount.find({});
        res.json(accounts);
    }
    catch(err){
        res.status(400).json('could not fetch accounts')
    }
})

app.post('/junior-prefect/daily-accounts', async(req, res) => {
    const newJuniorPrefectAccount = new JuniorPrefectAccount(req.body)
    try{
        const jpaccount = await newJuniorPrefectAccount.save()
        res.json(jpaccount)
    }
    catch(err){
        res.status(400).json("could not create!")
    }
})

// app.listen(process.env.PORT || 3000, ()=>{
//     console.log(`listening at ${process.env.PORT}`)
// })
app.listen('3001', ()=>{
    console.log(`listening at 3001`)
})
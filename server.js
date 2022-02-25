const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()
const Member = require('./models/Member')
const Prefect = require('./models/Users')
const bcrypt = require('bcryptjs')
const User = require('./models/Users')
const Ration = require('./models/Ration')
const PersonalDetail = require('./models/PersonalDetails')
const PrefectAccount = require('./models/PrefectAccount')
const JuniorPrefectAccount = require('./models/JuniorPrefectAccount')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const RefreshToken = require('./models/RefreshTokens')
const Register = require('./models/Register')


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
// const origin = 'http://localhost:3000'
const origin = 'https://hks-website-7f1d3.web.app'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({origin: origin,
}));
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploads/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const upload = multer({storage: storage,
    fileFilter: fileFilter
})

app.get('/', (req,res)=>{
    res.send('hello')
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS")
})

app.post('/register-member', upload.single('member_pic'), async(req, res) => {
    const member = new Member(
        {
            name: req.body.name,
            aadhar_no: req.body.aadhar_no,
            age: req.body.age,
            birth_place: req.body.birth_place,
            gothra: req.body.gothra,
            veda: req.body.veda,
            father_name: req.body.father_name,
            husband_or_wife_name: req.body.husband_or_wife_name,
            home_address: req.body.home_address,
            city: req.body.city,
            state: req.body.state,
            pin: req.body.pin,
            tel_no_office: req.body.tel_no_office,
            tel_no_home: req.body.tel_no_home,
            phone: req.body.phone,
            permanent_address: req.body.permanent_address,
            p_city: req.body.p_city,
            p_state: req.body.p_state,
            p_pin: req.body.p_pin,
            intro_name: req.body.intro_name,
            intro_phone: req.body.intro_phone,
            intro_id: req.body.intro_id,
            member_pic: req.file.path,
        }
    )
    try{
        const newMember = await member.save();
        res.json(newMember);
    }
    catch(err){
        console.log(err)
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
            const hashedPassword = await bcrypt.hashSync(req.body.password, 10)
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

function generateAccessToken(user){
    return jwt.sign({userid: user.userid, role: user.role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5m'})
}

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken === null) return res.status(400).json('you dont have access')
    RefreshToken.findOne({refreshToken: refreshToken}, (err, ref) => {
        if(err) throw err
        if(!ref) res.status(400).json("no such token")
        jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) throw err
            const accessToken = generateAccessToken({name: user.name, userid: user.userid})
            res.json({
                accessToken: accessToken
            })
        })
    })
})

app.delete('/logout', (req, res) => {
    const refreshToken = req.body.token
    RefreshToken.deleteOne({refreshToken: refreshToken})
    res.json("logged out successfully")
})

app.post('/login', (req, res) => {
    const { userid, password } = req.body

    User.findOne({userid: userid}, (err, user) => {
        if(err) throw err
        if(!user) res.status(400).json("no user found")
        if(user && bcrypt.compareSync(password, user.password)){
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign({userid: user.userid, role: user.role}, process.env.REFRESH_TOKEN_SECRET)
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
            res.status(400).json("wrong username or password")
        }
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

app.get('/users/:role', async(req, res) => {
    const {role} = req.params
    try{
        const fetchedUser = await User.find({role: role})
        res.json(fetchedUser)
    }
    catch(err){
        res.status(400).json("no user found")
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

app.post('/personal-details', upload.single('studentImage'), async(req, res) => {
    const { studentImage } = req.body
    const personalDetail = new PersonalDetail({
        name: req.body.name,
        phone: req.body.phone,
        fathername: req.body.fathername,
        mothername: req.body.mothername,
        fphone: req.body.fphone,
        mphone: req.body.mphone,
        address: req.body.address,
        college: req.body.college,
        aadhar_no: req.body.aadhar_no,
        room_no: req.body.room_no,
        studentImage: req.file.path
    })
    try{
        const newPersonalDetail = await personalDetail.save();
        res.json(newPersonalDetail);
    }
    catch(err){
        console.log(err)
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

app.post('/students/register/:id', async(req, res) => {
    const {id} = req.params
    const newRegister = new Register(req.body)
    try{
        const register = await newRegister.save()
        const reg = await Register.find({userid: id})
        res.json(reg)
    }
    catch(err){
        res.status(400).json("could not create!")
    }
})

app.get('/students/register', async(req,res)=>{
    try{
        const register = await Register.find({})
        res.json(register)
    }
    catch(err){
        res.status(400).json("no records found")
    }
})

app.get('/students/register/:id', async(req,res) => {
    const {id} = req.params
    try{
        const reg = await Register.find({userid: id})
        res.json(reg)
    }
    catch(err){
        res.status(400).json("no records found")
    }
})

app.patch('/students/register/:id/:date', async(req, res) => {
    const { id, date } = req.params
    console.log(id+" "+date)
    try{
        const reg = await Register.findOne({userid: id, check_out_date: date})
        Object.assign(reg, req.body)
        await reg.save()
        const registers = await Register.find({userid: id})
        res.json(registers)
    }
    catch(err){
        res.status(400).json("could not check in")
    }
})

app.listen(process.env.PORT, ()=>{
    console.log(`listening at ${process.env.PORT}`)
})
// app.listen('3001', ()=>{
//     console.log(`listening at 3001`)
// })
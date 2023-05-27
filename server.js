const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 5000;
const RegisterSchema = require('./model')
const jwt = require('jsonwebtoken')
const middleware = require('./middleware')
const cors = require('cors')
mongoose.connect('mongodb+srv://TaskSchema:task123@todolist.ucv1exp.mongodb.net/').then(
    () => console.log(`DB connected...`)
).catch((err) => console.log(err))


app.use(express.json())
app.use(cors({origin : "*"}))

app.get('/', (req, res) => {
  res.send(`<h1>Hello World!!!</h1>`)
})

app.post('/register', async (req, res) => {
    try {
        const {username, email, password, confirmpassword} = req.body
        let exist = await RegisterSchema.findOne({email: email})
        if(exist){
           return res.status(400).send(`User alreadt exists`)
        }
        if(password !== confirmpassword){
           return res.status(400).send('Password did not match')
        }
        const newUser = new RegisterSchema({
            username,
            email,
            password,
            confirmpassword
        })
       await newUser.save()
       return res.status(200).send(`Registered successfully`)
    }

    catch(err) {
        console.log(err)
        return res.status(500).send(`Internal server error`)
    }
})

app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        let exist = await RegisterSchema.findOne({email})
        if(!exist) {
            return res.status(500).send(`User not found`)
        }
        if(exist.password != password){
            return res.status(500).send(`Invalid credentials`)
        }     
        let payload = {
            user : {
                id : exist.id
            }
        }
        
        jwt.sign(payload, 'jwtSecret', {expiresIn: 3600000}, 
            (err, token) => {
                if(err) throw err 
                return res.json({token})
            }            
            )
    }

    catch(err) {
        console.log(err)
    }
})

app.get('/myprofile', middleware, async (req, res) => {
    try {
        let exist = await RegisterSchema.findById(req.user.id)
        if(!exist) {
            return res.status(400).send('User not found')
        }
        res.json(exist)
    }

    catch(err) {
        console.log(err)
    }
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})

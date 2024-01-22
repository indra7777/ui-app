import express from 'express'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import path from 'path'

dotenv.config()
const app = express()
app.set('view engine','ejs');
app.use('/public',express.static(process.cwd()+"/public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    // res.sendFile(process.cwd() + "/landing.html");
    res.render('landing')
})

app.get('/explore',(req,res)=>{
    res.render('explore')
})
app.post('/login',(req,res)=>{
    const {username,password}= req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
    console.log(`username: ${username} & password: ${password}`);
    res.status(200).send('Login successful')
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
}) 
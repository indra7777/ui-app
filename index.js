import express from 'express'

const app = express()

app.use('/public',express.static(process.cwd()+"/public"))
app.get("/",(req,res)=>{
    res.sendFile(process.cwd() + "/landing.html");
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
}) 
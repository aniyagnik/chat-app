const express=require('express')
const server=express();
const path=require('path')
const hbs=require('hbs')

server.set('view engine','hbs')
server.set('views',path.join(__dirname,'front/views'))
server.use('/',express.static(path.join(__dirname,'front/public')))

server.use(function (req,res,next){
    console.log('handling request : ',req.url+" with method "+req.method);
    next();
})

server.use('/dashboard',require('./chatServer')(io))

server.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'front/public/index.html'))
})

const port=8080;
server.listen(port,()=>{console.log('listening at port number ',port)})
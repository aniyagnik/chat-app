const app=require('express')();
const hbs=require('hbs')
const path=require('path')

app.set('view engine','hbs')
app.set('views',path.join(__dirname,'front/views'))

app.get('/',(req,res)=>{
    console.log('in dashboard get')
    const username='anirudh'
    const chatWith='yagnik'
    const message=[
        {
            sent:'how are you?'
        },
        {
            recieve:'fine!!'
        }
    ]
    res.render('index',{username,chatWith,message})
})

module.exports=function(io){
    io.on('connection', function(socket){
        console.log('a user connected ',socket.id);
         socket.emit('get_socketID',{socketId:socket.id})
    })
      return app
}
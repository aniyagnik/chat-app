const url = require('url');
const express=require('express')
const date = require('date-and-time');
var app = express();
let path=require('path')
const hbs=require('hbs')
hbs.registerPartials(path.join(__dirname,'../partials'))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'));
let users=[]

 app.get('/', function(req, res){
    console.log('in chat get') 
    if(req.user)
    {
      const chatWith=req.query.searchUser
      const {username}=req.user
      const {senderMsg}=req.params
      const {sender}=req.params
      console.log('values in chat get : ',username,chatWith,senderMsg,sender)
    }
    else
    {
      res.redirect('/')
    }
  });


app.post('/deleteChat',(req,res)=>{
  console.log('in get deleting chat')
  if(req.user){
    const {username}=req.user
    const {chatWith}=req.body
    console.log('req.body',req.body)
    console.log('user and chat with',chatWith)
  }
  else{
    res.redirect('/')
  }
})
  module.exports=function(io){
 
     
  io.on('connection', function(socket){
    console.log('a user connected ',socket.id);
     socket.emit('get_socketID',{socketId:socket.id})
    
     //getting username and socket.id
    socket.on('get_user',(userInfo)=>{
      const user={ username:userInfo.username,
                   socketId:userInfo.socketId
                }
      users.push(user)
       //console.log('all active users :: ',users)
    })

    //deleting a client
    socket.on('disconnect', function(){
      console.log('user disconnected',socket.id);
      if(users.length!==0)
      {
        const username=users.reduce(ele=>ele.socketId===socket.id).username
        users=users.filter(ele=>ele.socketId!==socket.id)
       console.log('REMOVAL OF USER : ',username)
        if(typeof username!=='undefined')
           console.log('changing  to false',username) 
      } 
    });

    
    

    //reading a message and then sending
    socket.on('message',(msg_taken)=>{
      //console.log('in message index',msg_taken.message)
      console.log("message send to : "+msg_taken.selected_user+'by '+msg_taken.user)
      const reciever=users.find(ele=>ele.username===msg_taken.selected_user)
      console.log('reciever is :',reciever)
      if(typeof reciever!=="undefined"){
        io.to(reciever.socketId).emit('res_msg',{
          user:msg_taken.user,
          message:msg_taken.message,
        })
      }
      
    })

    //recieved message
    socket.on('messageRecieved',(msg_taken)=>{
      console.log('reciever and sender is :',msg_taken.reciever,msg_taken.sender)
      let now
      (function getFormattedDate() {
        let date = new Date();
        now = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " +  date.getHours() + ":" + date.getMinutes();
      })()
    })

    socket.on('deleteUnseen',msg_taken=>{
      console.log('DELETED UNSEEN OF : ',msg_taken.sender)
    });
    
  });

 

  return app;
}
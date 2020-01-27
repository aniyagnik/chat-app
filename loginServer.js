const express = require('express')
const server = express.Router()
const path=require('path')
const passport=require('./passport')
server.use(express.json())
const  {insert_newAcc}=require('./database/loginCollection')
server.use(express.urlencoded({extended: true}))


server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/login.html'))
})

server.post('/login',passport.authenticate('local',{
    failureRedirect:'/not-found',
    successRedirect:'/user/dashboard'
}))


function checkForm(form)
  {
    if(form.username == "") {
      return false;
    }
    re = /^\w+$/;
    if(!re.test(form.username)) {
      return false;
    }
    if(!form.email.includes("@")) {
      return false;
    }
    if(form.password != "" && form.password == form.Cpassword) {
      if(form.password.length < 7) {
        return false;
      }
      if(form.password == form.username) {
        return false;
      }
      re = /[0-9]/;
      if(!re.test(form.password)) {
        return false;
      }
      re = /[a-z]/;
      if(!re.test(form.password)) {
        return false;
      }
      re = /[A-Z]/;
      if(!re.test(form.password)) {
        return false;
      }
    } else {
      return false;
    }
    return true;
}

server.post('/signup',(req,res)=>{
    const newAcc={
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        createdOn:req.body.date,
    }
    const form={...newAcc,Cpassword:req.body.Cpassword}
    const val=checkForm(form)
    if(val){
      async function add(){
        //const addedUser=await create_newUnactiveLoginAcc(newAcc)
        const addedUser=await insert_loginAcc(newAcc)
        console.log("added user is : ",addedUser)
        if(!addedUser)
        {
          console.log('adduser is null')
          res.send("username or email already exist")
        }
        else{
          console.log('adduser is not null')
          res.send('account created proceed to login...')
          //res.redirect('/mail/send?to='+req.body.email)
        }
       }
       add()
    }
    else{
      res.send("error in login credentials")
    }
     
})


module.exports=server
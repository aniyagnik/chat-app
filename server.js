const express=require('express')
const server=express();
const path=require('path')
const hbs=require('hbs')
const passport=require('./passport')

// Initialize Passport and restore authentication state, if any, from the
// session.
server.use(passport.initialize());
server.use(passport.session());

server.set('view engine','hbs')
server.set('views',path.join(__dirname,'front/views'))
server.use('/',express.static(path.join(__dirname,'front/public')))

server.use(function (req,res,next){
    console.log('handling request : ',req.url+" with method "+req.method);
    next();
})


//server.use('/dashboard',require('./chatServer')(io))

server.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'front/public/index.html'))
})

server.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

server.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
});

const port=8080;
server.listen(port,()=>{console.log('listening at port number ',port)})

/*
clientid - 449868308469-t6bf89entt97tdvjvl7o57k6dc4icoih.apps.googleusercontent.com
client secret - HN11JD7pXzANZhNO7NRlxvNq
*/
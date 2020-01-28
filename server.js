const express=require('express')
const app=express();
const path=require('path')
const http=require('http')
var server = http.createServer(app);

const passport=require('./passport')
var io = require('socket.io')(server);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/',express.static(path.join(__dirname,'front/public')))

app.use(function (req,res,next){
    console.log('handling request : ',req.url+" with method "+req.method);
    next();
})

app.use('/dashboard',require('./chatServer')(io))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'front/public/index.html'))
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
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
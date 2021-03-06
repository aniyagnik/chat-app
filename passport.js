const passport=require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
//const {edit_loginAccount}=require('./database/loginCollection')

passport.use(new GoogleStrategy({
    clientID: '449868308469-t6bf89entt97tdvjvl7o57k6dc4icoih.apps.googleusercontent.com',
    clientSecret: 'HN11JD7pXzANZhNO7NRlxvNq',
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    //console.log('profile ',profile)
    //save profile-id in database
    const account={
        id:profile.id,
        firstname:profile.name.givenName,
        lastname:profile.name.familyName,
        photo:profile.photos[0].value,
        online:true
    }
    //edit_loginAccount(account)
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
  
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
module.exports=passport

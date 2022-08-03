/*
Annas: Code for Passport.js and any google authentication has been derived or manipulated from this tutorial: https://www.youtube.com/watch?v=o9e3ex-axzA
       Code related to mongoose has been derived or manipulated https://rahmanfadhil.com/express-rest-api/
*/
const passport = require('passport')
const User = require('./models/User')

const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (username, done) {
  User.findOne({ _id: username }, function (err, user) {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '1042176168336-9d9980j4hn9ij9hk534lvhjdmt86o0qq.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'https://noisy-ninjas.nn.r.appspot.com/api/google/callback',
      //TODO: ENV FILE?
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ googleID: profile.id }, function (err, user) {
        if (err) return res.status(500).end(err)
        if (user) return cb(err, user)
        User.countDocuments(
          { displayName: profile.displayName },
          function (err, amount) {
            const add = amount === 0 ? '' : profile.id
            const new_user = new User({
              googleID: profile.id,
              displayName: profile.displayName + add,
              imageURL: profile.photos[0].value,
              points: 0,
              hash: 'N/A',
            })
            new_user.save(function (err, newuser) {
              if (err) return res.status(500).end(err)
              return cb(err, newuser)
            })
          }
        )
      })
    }
  )
)

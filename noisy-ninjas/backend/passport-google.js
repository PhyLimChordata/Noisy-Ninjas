/*
Annas: Code for Passport.js and any google authentication has been derived or manipulated from this tutorial: https://www.youtube.com/watch?v=o9e3ex-axzA
       Code related to mongoose has been derived or manipulated https://rahmanfadhil.com/express-rest-api/
*/
const passport = require('passport')
const User = require('../models/User')

const path = require('path')
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.serializeUser(function (user, done) {
  //console.log('serailize???')
  //console.log(user)

  done(null, user)
})

passport.deserializeUser(function (username, done) {
  //console.log('there')
  User.findOne({ _id: username }, function (err, user) {
    //console.log('asdasd')

    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '1042176168336-9d9980j4hn9ij9hk534lvhjdmt86o0qq.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:5000/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("111111")
      console.log(profile)
      console.log("111111231231231231")
      console.log(profile.displayName)
      User.findOne({ googleID: profile.id }, function (err, user) {
      //   console.log('GOT HERE')
      //  console.log(user)
       // console.log(err)
        if (err) return res.status(500).end(err)
       // console.log(user)
        if (user) {
          //console.log(user);
          return cb(err, user)
        }
        User.countDocuments({displayName: profile.displayName}, function (err, amount) {
       console.log(amount)
       if(amount === 0){
        add = ""
       }
       else{
        add = amount
       }
        const new_user = new User({
          googleID: profile.id,
          displayName: profile.displayName + add,
          imageURL: profile.photos[0].value,
          points: 0,
          hash: 'N/A',
        })
      //  console.log('User:')
      //  console.log(new_user)
        new_user.save(function (err, newuser) {
          if (err) return res.status(500).end(err)
         // console.log(new_user)
          return cb(err, newuser)
        })
      })

      })
    }
  )
)

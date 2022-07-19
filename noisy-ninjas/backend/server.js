//Treat these as imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const User = require('../models/User')
const passport = require('passport');
require('dotenv').config({path: '../../.env'});
const session = require('express-session');
const cookie = require('cookie');
const bcrypt = require('bcrypt');
require('./passport-google');

const saltRounds = 10;

/*
Annas: Code for Passport.js and any google authentication has been derived or manipulated from this tutorial: https://www.youtube.com/watch?v=o9e3ex-axzA
       Code related to mongoose has been derived or manipulated https://rahmanfadhil.com/express-rest-api/
       Code related to basic session has been derived from assignment and lecture code
*/


const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "secretboy",
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: "lax", //TODO: CHANGE THIS to none
        secure: false //TODO: CHANGE THIS to true
    }
}));
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//     next();
// });

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    let username = (req.session.user)? req.session.user.displayName : '';
    res.setHeader('Set-Cookie',
        cookie.serialize('displayName', username, {
          path : '/',
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    next();
});

//Mongoose connects to the db based on uri
const uri = process.env.URI;



mongoose.connect("mongodb+srv://noisyninja:D0LEynTxJbJbsYIL@noisyninjas.v6cmx.mongodb.net/?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});


app.use(function (req, res, next) {
    const displayName = req.session.displayName;
    req.displayName = displayName || null;
    console.log("HTTP request", port, req.method, req.url, req.body);
    next();
});




const isAuthenticated = function(req, res, next) {
    console.log(req)
    if (!req.displayName) return res.status(401).end("access denied");
    next();
};

const hasAccess = function (req, res, next) {
    const displayName = req.params.displayName;
    if (!req.displayName) return res.status(401).end("access denied");
    if (displayName !== req.displayName) return res.status(403).end("access forbidden");
    next();
};

app.get('/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ]}
));

app.get( '/google/callback',
    passport.authenticate( 'google', {
        
        failureRedirect: '/google/failure'
}),
function(req, res) {
    // Successful authentication, redirect home.
    req.session.user = req.user;
    res.redirect('/google/success');
  }
);

app.get("/api/users",  function (req, res) {
    console.log("kek")
    leaderBoardIndex= req.query.page;
	limit = req.query.limit
    
      
      User
      .find()
      .sort({ points: -1 })
      .skip(limit*req.query.page)
      .limit(limit)
      .exec(function (err, users) {
        if (err) return res.status(500).end(err);
        
        return res.json(users);
      });
    
    
  });

  app.get("/api/users/:displayName",  function (req, res) {
      User
      .findOne({displayName: req.params.displayName})
      .exec(function (err, user) {
        if (err) return res.status(500).end(err);
        delete user.hash;
        return res.json(user);
      });
  });


app.delete("/api/users/:displayName", hasAccess,  function (req, res) {
    const displayName = req.params.displayName
    User.deleteOne({displayName}).then(() => {
        req.session.destroy();
        res.setHeader('Set-Cookie', cookie.serialize('displayName', '', {
            path : '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
        }));
        return res.json({})
    }).catch(err => {
        return res.status(500).end(err)
    })
});

app.patch("/api/users/:displayName/password",  function (req, res) {
    const displayName = req.params.displayName
    if (!('password' in req.body)) return res.status(400).end('password is missing');
    const password = req.body.password;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) return res.status(500).end(err);
            User
                .findOneAndUpdate({displayName}, {new: true}, {hash})
                .exec(function (err) {
                    if (err) return res.status(500).end(err);
                    return res.json(displayName);
                });
        });
    });
});

app.get('/signout/', function(req, res, next){
    req.session.destroy();
    res.setHeader('Set-Cookie', cookie.serialize('displayName', '', {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    return res.json({});
});

  app.post('/signin/', function (req, res, next) {
      if (!("displayName" in req.body))
          return res.status(422).end("displayName is missing");
      if (!("password" in req.body))
          return res.status(422).end("password is missing");
      const displayName = req.body.displayName;
      const password = req.body.password;

      // retrieve user from the database
      User.findOne({ displayName: displayName }, function (err, user) {
          if (err) return res.status(500).end(err);
          if (!user) return res.status(401).end("access denied");
          const hash = user.hash;
          bcrypt.compare(password, hash, function (err, result) {
              if (err) return res.status(500).end(err);
              if (result) {
                  // initialize cookie
                  const a = cookie.serialize('displayName', displayName, {
                      path : '/',
                      maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
                  })
                  console.log(a)
                  res.setHeader(
                      "Set-Cookie",
                      cookie.serialize("displayName", displayName, {
                          path: "/",
                          maxAge: 60 * 60 * 24 * 7,
                      })
                  );
                  req.session.displayName = displayName;
                  return res.json(displayName);
              } else {
                  return res.status(401).end("access denied");
              }
          });
      });
  });

  app.post('/signup/', function (req, res, next) {
      if (!("displayName" in req.body))
          return res.status(422).end("displayName is missing");
      if (!("password" in req.body))
          return res.status(422).end("password is missing");
      const displayName = req.body.displayName;
      const password = req.body.password;
      User.findOne({ displayName }, function (err, user) {
          if (err) return res.status(500).end(err);
          if (user)
              return res.status(409).end("displayName " + displayName + " already exists");
          bcrypt.hash(password, saltRounds, function (err, hash) {
              const ninja = "https://api.time.com/wp-content/uploads/2019/04/tyler-blevins-ninja-time-100-2019-002-1.jpg?quality=85&zoom=2"
              const new_user = new User({googleID: "N/A",  displayName: req.body.displayName, imageURL: ninja, points: 0, hash: hash})
              new_user.save(function(err){
                      if (err) return res.status(500).end(err);
                      return res.json(displayName);
                  }
              );
          });
      });
  });


//Primitive tests for Authentication / Authorization
app.get('/', (req, res) => res.send('Not logged in'))
app.get('/google/failure', (req, res) => res.send('Login fail'))
app.get('/google/success', isAuthenticated, (req, res) => res.send(`You ${req.session.user.displayName}`))

//Adds routes for express to use
//Example route: http://localhost:5000/example/add
// const loginRouter = require('./routes/login');
// app.use('/login', loginRouter);

//App is now listening for calls
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


//Treat these as imports
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const User = require('./models/User')
const passport = require('passport')
require('dotenv').config({ path: '../../.env' })
const session = require('express-session')
const cookie = require('cookie')
const bcrypt = require('bcrypt')
require('./passport-google')

const saltRounds = 10

const app = express();

const port = process.env.PORT || 3000;
const webSocketPort = process.env.WEBSOCKETPORT || 8000;
const corsOptions = {
  origin: 'https://noisy-ninjas.nn.r.appspot.com',
  credentials: true,
  methods: "GET, PUT, POST, PATCH, DELETE, HEAD, OPTIONS",
  allowedHeaders: ["*"]
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(
  session({
    secret: 'secretboy',
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: 'none', //TODO: CHANGE THIS to none
      secure: true, //TODO: CHANGE THIS to true
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.set("trust proxy", 1);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PATCH,PUT");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept,Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie");
  // res.header("Access-Control-Expose-Headers", "Set-Cookie");
  next();
});

//Mongoose connects to the db based on uri
const uri = process.env.URI

mongoose.connect(
  'mongodb+srv://noisyninja:D0LEynTxJbJbsYIL@noisyninjas.v6cmx.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

app.use(function (req, res, next) {
  const displayName = req.session.displayName
  req.displayName = displayName || null
  console.log('HTTP request', port, req.method, req.url, req.body)
  next()
})

const isAuthenticated = function (req, res, next) {
  console.log(req.displayName)
  if (!req.displayName) return res.status(401).end('access denied')
  next()
}

const hasAccess = function (req, res, next) {
  const displayName = req.params.displayName
  if (!req.displayName) return res.status(401).end('access denied')
  if (displayName !== req.displayName)
    return res.status(403).end('access forbidden')
  next()
}

app.get(
  '/api/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get(
  '/api/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'https://noisy-ninjas.nn.r.appspot.com',
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    const displayName = req.user.displayName
    console.log("HELLOOOOOO")
    console.log(displayName);
    req.session.displayName = displayName
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('displayName', displayName, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
      })
    )
    res.redirect('https://noisy-ninjas.nn.r.appspot.com/lobby')
  }
)

app.get('/api/users/:displayName', hasAccess, function (req, res) {
  User.findOne({ displayName: req.params.displayName }).exec(function (
    err,
    user
  ) {
    if (err) return res.status(500).end(err)
    if (!user) return res.status(401).end('access denied')
    delete user.hash
    return res.json(user)
  })
})

app.get('/api/rankings', isAuthenticated, function (req, res) {
  const page = req.query.page || 0
  const limit = req.query.limit || 10
  User.find({}, { displayName: 1, _id: 0 })
    .sort({ points: -1, gamesPlayed: -1 })
    .skip(limit * page)
    .limit(limit)
    .exec(function (err, users) {
      if (err) return res.status(500).end(err)
      const rankings = users.map((user, index) => {
        return { displayName: user.displayName, rank: index + page * limit }
      })
      return res.json({ rankings: rankings })
    })
})

app.get('/api/rankings/:displayName', isAuthenticated, function (req, res) {
  const displayName = req.params.displayName
  User.findOne(
    { displayName: displayName },
    { gamesPlayed: 1, gamesWon: 1, points: 1, _id: 0 },
    function (err, user) {
      if (err) return res.status(500).end(err)
      if (!user) return res.status(404).end(`User ${displayName} not found`)
      User.find({
        $or: [
          { points: { $gt: user.points } },
          {
            points: user.points,
            gamesPlayed: { $gt: user.gamesPlayed },
          },
        ],
      }).count(function (err, rank) {
        if (err) return res.status(500).end(err)
        return res.json({ rank: rank })
      })
    }
  )
})

app.delete('/api/users/:displayName', hasAccess, function (req, res) {
  const displayName = req.params.displayName
  User.deleteOne({ displayName })
    .then(() => {
      req.session.destroy()
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('displayName', '', {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
        })
      )
      return res.json({})
    })
    .catch((err) => {
      return res.status(500).end(err)
    })
})

app.patch('/api/users/:displayName/password', hasAccess, function (req, res) {
  const displayName = req.params.displayName
  if (!('password' in req.body))
    return res.status(400).end('password is missing')
  const password = req.body.password
  // Checks longer than 7 characters, has numbers and letters, and has capitals and lowercase
  if (
    password.length <= 7 ||
    !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)
  ) {
    return res.status(422).end('password does not meet requirements')
  }
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) return res.status(500).end(err)
      User.findOneAndUpdate({ displayName }, { hash }, { new: true }).exec(
        function (err) {
          if (err) return res.status(500).end(err)
          return res.json(displayName)
        }
      )
    })
  })
})

app.get('/api/users/:displayName/stats', isAuthenticated, function (req, res) {
  const displayName = req.params.displayName
  User.findOne(
    { displayName: displayName },
    { gamesPlayed: 1, gamesWon: 1, points: 1, _id: 0 },
    function (err, user) {
      if (err) return res.status(500).end(err)
      if (!user) return res.status(404).end(`User ${displayName} not found`)
      return res.json(user)
    }
  )
})
app.patch("/api/users/:displayName/username",  function (req, res) {
    const displayName = req.params.displayName;
    const newName = req.body.username;
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    
    User.findOne({ displayName: newName }, function (err, user) {
        if (err) return res.status(500).end(err);
        if (user) return res.status(403).end(`Display name: ${newName} already exists!`);
            User
                .findOneAndUpdate({displayName},  {displayName: newName}, {new: true})
                .exec(function (err) {
                    if (err) return res.status(500).end(err);
                    res.setHeader(
                        "Set-Cookie",
                        cookie.serialize("displayName", newName, {
                            path: "/",
                            maxAge: 60 * 60 * 24 * 7,
                        })
                    );
                    req.session.displayName = newName;
                    return res.json(newName);
                });
        
            });
});

app.patch("/api/users/:displayName/win", function (req, res) {
    const displayName = req.params.displayName;
    User.findOne({displayName}, function (err, user) {
        if (err) return res.status(500).end(err);
        let newPoints = user.points + 5;
        let gamesPlayed = user.gamesPlayed + 1;
        let gamesWon = user.gamesWon + 1;
        let beltRank = "N/A";
        if (newPoints >= 121) {
            beltRank = "#2E2E2E";
        } else if (newPoints >= 76) {
            beltRank = "#B66200";
        } else if (newPoints >= 36) {
            beltRank = "#3366BD";
        } else if (newPoints >= 21) {
            beltRank = "#3D8B00";
        } else if (newPoints >= 11) {
            beltRank = "#FFB800";
        } else {
            beltRank = "#FFFFFF";
        }

        User.findOneAndUpdate({displayName}, {points: newPoints, beltRank: beltRank, gamesPlayed: gamesPlayed, gamesWon: gamesWon }).exec(function(err, updatedUser) {
            if (err) return res.status(500).end(err);
            return res.json({promoted: beltRank !== user.beltRank, message: "+5 points have been added to " + displayName + "\'s account. The user now has " + (user.points + 5) + " points. The user is a " + beltRank + " belt.", user: updatedUser});
        });
    });
});

app.patch("/api/users/:displayName/lose", function (req, res) {
    const displayName = req.params.displayName;
    User.findOne({displayName}, function (err, user) {
        if (err) return res.status(500).end(err);
        let newPoints = 0;
        let gamesPlayed = user.gamesPlayed + 1;
        let beltRank = "N/A";

        if (user.points - 3 > 0) {
            newPoints = user.points - 3;
        }
        else {
            newPoints = 0;
        }

        if (newPoints <= 10) {
            beltRank = "#FFFFFF";
        } else if (newPoints <= 20) {
            beltRank = "#FFB800";
        } else if (newPoints <= 35) {
            beltRank = "#3DBB00";
        } else if (newPoints <= 75) {
            beltRank = "#3366BD";
        } else if (newPoints <= 120) {
            beltRank = "#B66200";
        } else {
            beltRank = "#2E2E2E";
        }

        User.findOneAndUpdate({displayName}, {points: newPoints, gamesPlayed: gamesPlayed, beltRank: beltRank}).exec(function(err, updatedUser) {
            if (err) return res.status(500).end(err);
            return res.json({demoted: beltRank !== user.beltRank, message: "+5 points have been added to " + displayName + "\'s account. The user now has " + newPoints + " points", user: updatedUser});
        });
    });
});


app.get('/api/signout/', function(req, res, next){
    req.session.destroy();
    res.setHeader('Set-Cookie', cookie.serialize('displayName', '', {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    return res.json({});
});

app.patch("/api/users/:displayName/matchId",  function (req, res) {
    const displayName = req.params.displayName
    const newMatchId = req.body.matchId;
    if (!('matchID' in req.body)) return res.status(400).end('matchID is missing');

            User
                .findOneAndUpdate({displayName},  {matchId: newMatchId}, {new: true})
                .exec(function (err) {
                    if (err) return res.status(500).end(err);
                    return res.json(newMatchId);
                });

});


app.patch('/api/users/:displayName/username', hasAccess, function (req, res) {
  const displayName = req.params.displayName
  const newName = req.body.username
  if (!('username' in req.body))
    return res.status(400).end('username is missing')

  User.findOne({ displayName: newName }, function (err, user) {
    if (err) return res.status(500).end(err)
    if (user)
      return res.status(403).end(`Display name: ${newName} already exists!`)
    User.findOneAndUpdate(
      { displayName },
      { displayName: newName },
      { new: true }
    ).exec(function (err) {
      if (err) return res.status(500).end(err)
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('displayName', newName, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        })
      )
      req.session.displayName = newName
      return res.json(newName)
    })
  })
})

app.get('/api/signout/', function (req, res, next) {
  req.session.destroy()
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('displayName', '', {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
    })
  )
  return res.json({})
})
  app.post('/api/signup/', function (req, res, next) {
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
              const new_user = new User({googleID: "N/A",  displayName: req.body.displayName, imageURL: ninja, points: 5, beltRank: "#FFFFFFF", hash: hash})
              new_user.save(function(err){
                      if (err) return res.status(500).end(err);
                      return res.json(displayName);
                  }
              );
          });
      });
  });

app.post('/api/signin/', function (req, res, next) {
  if (!('displayName' in req.body))
    return res.status(422).end('displayName is missing')
  if (!('password' in req.body))
    return res.status(422).end('password is missing')
  const displayName = req.body.displayName
  const password = req.body.password

  // retrieve user from the database
  User.findOne({ displayName: displayName }, function (err, user) {
    if (err) return res.status(500).end(err)
    if (!user) return res.status(401).end('access denied')
    const hash = user.hash
    bcrypt.compare(password, hash, function (err, result) {
      if (err) return res.status(500).end(err)
      if (result) {
        // initialize cookie
        const a = cookie.serialize('displayName', displayName, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
        })
        console.log(a)
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('displayName', displayName, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          })
        )
        req.session.displayName = displayName
        req.session.save();

        return res.json(displayName)
      } else {
        return res.status(401).end('access denied')
      }
    })
  })
})

app.post('/api/signup/', function (req, res, next) {
  if (!('displayName' in req.body))
    return res.status(422).end('displayName is missing')
  if (!('password' in req.body))
    return res.status(422).end('password is missing')

  const displayName = req.body.displayName
  const password = req.body.password

  // Checks longer than 7 characters, has numbers and letters, and has capitals and lowercase
  if (
    password.length <= 7 ||
    !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)
  ) {
    return res.status(422).end('password does not meet requirements')
  }
  User.findOne({ displayName }, function (err, user) {
    if (err) return res.status(500).end(err)
    if (user)
      return res
        .status(409)
        .end('displayName ' + displayName + ' already exists')
    bcrypt.hash(password, saltRounds, function (err, hash) {
      const ninja =
        'https://api.time.com/wp-content/uploads/2019/04/tyler-blevins-ninja-time-100-2019-002-1.jpg?quality=85&zoom=2'
      const new_user = new User({
        googleID: 'N/A',
        displayName: req.body.displayName,
        imageURL: ninja,
        points: 5,
        beltRank: "#FFFFFF",
        hash: hash,
      })
      new_user.save(function (err) {
        if (err) return res.status(500).end(err)
        return res.json(displayName)
      })
    })
  })
})

//Primitive tests for Authentication / Authorization
app.get('/', (req, res) => res.send('Not logged in'))

app.use('/api/map', require('./routes/mapRoute'))
app.use('/api/match', require('./routes/matchRoute'))

const hexRouter = require('./routes/hex')
app.use('/api/map', hexRouter)

//App is now listening for calls
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// // Annas: rame for websocket code adapted from: https://blog.logrocket.com/websockets-tutorial-how-to-go-real-time-with-node-and-react-8e4693fbf843/

const webSocketServer = require('websocket').server;
const http = require('http');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketPort, () => {console.log(`Websocket server running on websocketPort: ${webSocketPort}`)});
const wsServer = new webSocketServer({
  httpServer: server
});


// I'm maintaining all active connections in this object
const clients = {};
const Matches = [];
const Queue = [{ninjas: [], monsters: []}];
var monsterPlayers = 0;
var ninjaPlayers = 0;

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};


wsServer.on('request', function (request) {
    var userID = getUniqueID();
    
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

    //Needs to make a random MatchID
    //Send out the random matchID when everyones ready
  
    connection.on('message', function(message) {
      if (message.type === 'utf8') {
        
        data = JSON.parse(message.utf8Data);
        
        if(data.type === "leave"){
            if (["draco", "screamer", "tiny"].includes(data.skin)) {
                for (i = 0; i < Queue.length; i++) {
                    monsterPlayer = Queue[i].monsters.find(e => e.name === data.name);
                    if (monsterPlayer) {
                        index = Queue[i].monsters.indexOf(monsterPlayer);
                        Queue[i].monsters.splice(index, 1);
                        monsterPlayers--;

                        q = Queue[i]

                        if (Queue[i].ninjas.length === 0 && Queue[i].monsters.length === 0) {
                            Queue.splice(i, 1);
                        }
                        break;
                    }
                }
            } else {
                for (i = 0; i < Queue.length; i++) {
                    ninjaPlayer = Queue[i].ninjas.find(e => e.name === data.name);
                    if (ninjaPlayer) {
                        index = Queue[i].ninjas.indexOf(ninjaPlayer);
                        Queue[i].ninjas.splice(index, 1);
                        q = Queue[i];
                        if (i > 0 && Queue[i].ninjas.length === 0 && Queue[i].monsters.length === 0) {
                            Queue.splice(i, 1);
                        }
                        break;
                    }
                }
            }

            console.log(q);

            for(key in clients) {
                clients[key].send(JSON.stringify({ninjaQueue: q.ninjas, monsterQueue: q.monsters}));
            }   
           
        //     currMatch = Matches.find(e=> e.matchId === data.matchId)

        //     currPlayer = currMatch.user.find(e=> e.name === data.name);
        //         currMatch.user.pop(currPlayer);
            
        //   console.log(Matches);

        //   for(key in clients) {
        //     clients[key].send(currMatch.user.length);
        //   }      
        // foundNinja = 0
        // for(i = 0; i< Queue.length; i++){
        //   ninjaPlayer = Queue[i].ninjas.find(e => e.name === data.name);
        //   if(ninjaPlayer){
        //     foundNinja = i;
        //   }
        // }

        // foundMonster = 0
        // for(i = 0; i< Queue.length; i++){
        //   monsterPlater = Queue[i].monsters.find(e => e.name === data.name);
        //   if(monsterPlayer){
        //     foundMonster = i;
        //   }
        // }

           
          
            
        //     if ((foundNinja === 0) && (foundMonster === 0)) {
        //         return;
        //     }
        //     else if(!(foundNinja === 0)){
        //     const index = Queue[foundNinja].ninjas.indexOf(data.name);
        //     Queue[foundNinja].ninjas.splice(index, 1);
        //   }
        //     else{
        //       const index = Queue[foundMonster].monsters.indexOf(data.name);
        //     Queue[foundMonster].monsters.splice(index, 1);
        //     }
            

        //     console.log(Queue);
        //     for(key in clients) {
        //         clients[key].send(JSON.stringify({queue: Queue}));
        //     }   
            

        }

        
        
        if (data.type === "enter") {
          if (["draco", "screamer", "tiny"].includes(data.skin)) {
            for(i = 0; i< Queue.length; i++) {
                if (Queue[i].monsters.length === 0) {
                    Queue[i].monsters.push({name: data.name, skin: data.skin});
                    q = Queue[i];

                    Queue.push({ninjas:[], monsters: []})
                    monsterPlayers++; 

                    break;
                }
            }
          } else {
              console.log(monsterPlayers);
            if (monsterPlayers > 0) {
                for (i = 0; i<Queue.length; i++) {
                    if (Queue[i].monsters.length == 1) {
                        Queue[i].ninjas.push({name: data.name, skin: data.skin});
                        q = Queue[i];
                        console.log(q);
                        break;
                    }
                }
            } else {
                for (i = 0; i<Queue.length; i++) {
                    if (Queue[i].ninjas.length !== 4) {
                        Queue[i].ninjas.push({name: data.name, skin: data.skin});
                        q = Queue[i];
                        break;
                    }
                }
            }
          }

          console.log(Queue);

        for(key in clients) {
            clients[key].send(JSON.stringify({ninjaQueue: q.ninjas, monsterQueue: q.monsters, queue: q}));
          }       

            
        //   foundNinja = 0
        //   for(i = 0; i< Queue.length; i++){
        //     ninjaPlayer = Queue[i].ninjas.find(e => e.name === data.name);
        //     if(ninjaPlayer){
        //       foundNinja = foundNinja + 1;
        //     }
        //   }

        //   foundMonster = 0
        //   for(i = 0; i< Queue.length; i++){
        //     monsterPlayer = Queue[i].monsters.find(e => e.name === data.name);
        //     if(monsterPlayer){
        //       foundMonster = foundMonster + 1;
        //     }
        //   }

            
        //     // if ((ninjaPlayer === undefined) || (monsterPlayer === undefined)) {
        //       if(["draco", "screamer", "tiny"].includes(data.skin)){
        //         for(i = 0; i< Queue.length; i++){
        //             if((Queue[i].monsters.length === 0) && (foundMonster === 0)) {
        //             Queue[i].monsters.push({name: data.name, skin: data.skin});
        //             foundMonster = 1;
        //             }
        //         }
        //         if(foundMonster === 0){
        //           Queue.add({ninjas:[], monsters: [{name: data.name, skin: data.skin}]})
        //         }
        //       }
        //         else{
        //           for(i = 0; i< Queue.length; i++){
        //             if((Queue[i].length <= 3) && (foundNinja === 0)) {
        //               Queue[i].ninjas.push({name: data.name, skin: data.skin});
        //               foundNinja = 1;
        //             }
        //             }
        //             if(foundNinja === 0){
        //               Queue.push({ninjas:[{name: data.name, skin: data.skin}], monsters: []})
        //             }
        //         }
        //     // }

        //     console.log(Queue);

           
            for(key in clients) {
              
                clients[key].send(JSON.stringify(Queue));
            }       
        }

        if(data.type === "matchFound"){ 
            console.log(Queue);

            Queue.pop({ninjas: data.ninjaQueue, monsters: data.monsterQueue});
            Queue.pop(data.queue);
            monsterPlayers--;

            if (Queue.length === 0) {
                Queue.push({ninjas: [], monsters: []})
            }
            console.log("Updated queue");
            console.log(Queue);

        for (key in clients) {
            clients[key].send(JSON.stringify({matchID: data.matchID, ninjaQueue: data.ninjaQueue, monsterQueue: data.monsterQueue}));
        }


        //   if(["draco", "screamer", "tiny"].includes(data.skin)){
        //     for(i = 0; i < Queue.length; i++){
        //       if(Queue[i].monsters.includes(data.name)){
        //         for (key in clients) {
        //           clients[key].send(JSON.stringify({matchID: data.matchID, queue: Queue[i]}));
        //       }
        //         Queue.splice(i,1)

        //       }

        //     }

        //   }
        //   else{

        //     for(i = 0; i < Queue.length; i++){
        //       if(Queue[i].ninjas.includes(data.name)){
        //         for (key in clients) {
        //           clients[key].send(JSON.stringify({matchID: data.matchID, queue: Queue[i]}));
        //       }
        //         Queue.splice(i,1)

        //       }

        //     }

        //   }


            // console.log(data.matchID);
            // newQueue = {ninjas: [], monsters: []}
            // for(i =0; i < 4; i++){
            //   newQueue.ninjas.push(Queue.ninjas.shift())
            // }
            // newQueue.monsters.push(Queue.monsters.shift())
            // for (key in clients) {
            //     clients[key].send(JSON.stringify({matchID: data.matchID, queue: newQueue}));
            // }
            // //remove them from the queue
        }

        if(data.type === "create"){
            console.log("CREATING")


            currMatch = Matches.find(e=> e.matchId === data.matchId)
          
          if(!(currMatch === undefined)){
            currPlayer = currMatch.user.find(e=> e.name === data.name);
            if (currPlayer === undefined) {
                let user = {name: data.name , skin: data.skin, chat: data.chat, ready: false}
                currMatch.user.push(user);
            }           
          }
          else{
            let match = { matchId: data.matchId, user: [{name: data.name, skin: data.skin, chat: data.chat, ready: false}]}
            Matches.push(match)
            //return "New match"
          }
          console.log(Matches);
          currMatch = Matches.find(e=> e.matchId === data.matchId);

          for(key in clients) {
            clients[key].send(currMatch.user.length);
          }          
        }
        
      else if(data.type === "update"){
  
        currMatch = Matches.find(e=> e.matchId === data.matchId)
        currPlayer = currMatch.user.find(e=> e.name === data.name)
        currPlayer.ready = true
        ready = true;
        for(i = 0; i < currMatch.user.length; i++){
          ready = (ready && currMatch.user[i].ready)
        }

        for(i = 0; i < Matches[0].user.length; i++){
            console.log(Matches[0].user[i].ready);
        }
  
        if(ready){
            console.log(data.matchId);
            for(key in clients) {
                clients[key].send(JSON.stringify({message: "ready", data: data.matchId}));
              }

        for(i = 0; i < currMatch.user.length; i++){
            currMatch.user[i].ready = false
            }
            console.log(currMatch);
        }
    
       
    
    }
    else if (data.type === "death") {
        currMatch = Matches.find(e => e.matchId === data.matchId)
        currPlayer = currMatch.user.find(e=>e.name === data.name);
        currMatch.user.pop(currPlayer);
        if (["draco", "screamer", "tiny"].includes(data.skin)) {
          
          for (key in clients) {
            clients[key].send(JSON.stringify({message: "ninjas won", data: currMatch}))
        }
        }
        
        
        else if (currMatch.user.length === 1) {
            for (key in clients) {
                clients[key].send(JSON.stringify({message: "monster won", data: currMatch}))
            }
        }
    }    
      }
    })
  });
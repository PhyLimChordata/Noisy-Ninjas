// Annas: rame for websocket code adapted from: https://blog.logrocket.com/websockets-tutorial-how-to-go-real-time-with-node-and-react-8e4693fbf843/

const express = require('express')
const app = express()
const port = process.env.PORT || 3005

// I'm maintaining all active connections in this object
const clients = {};
const Matches = [];
const Queue = [{ninjas: [], monsters: []}];
var monsterPlayers = 0;
var ninjaPlayers = 0;

let a = 0;


app.get('/', (req, res) => {
  res.send('Hello World! ' + process.env.PORT);
})


const webSocketPort = 8002;
app.listen(webSocketPort, () => {
  console.log(`Example app listening on port ${port}`)
})

const http = require('http');
const {Server} = require('socket.io')
const serve = http.createServer(app);

// // const io = new Server(serve, { 
// //   cors: {
// //     origin: "http://localhost:3000",
// //     methods: ["GET", "POST"]
// //   }
// // })

// // io.on("connection", (socket) => {
// //   console.log("User connected " + socket.id)

// //   socket.on("enter", (data) => {
// //     console.log("Ok");
// //     socket.broadcast.emit("entered_queue", data);
// //   })
// // })
// // // const PORTER = process.env.PORT || 3231

// // serve.listen(3210)




const webSocketServer = require('websocket').server;
const https = require('http');
// Spinning the http server and the websocket server.
const server = https.createServer(app);

server.listen(port, () => {console.log(`Websocket server running on websocketPort: ${webSocketPort}`)});
const wsServer = new webSocketServer({
  httpServer: server
});





// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};


wsServer.on('request', function (request) {
    var userID = getUniqueID();

    a = 5;
    
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
const router = require('express').Router();
const Match = require('../schemas/match');
const Map = require('../schemas/map');
const Ninja = require('../schemas/ninja');
const Monster = require('../schemas/monster');
const User = require('../../models/User')

let shurikenDown = function(x,y,n,v,map,effect){
    // console.log(`cor${x},${y}`)
    cor = map.map[ `cor${x},${y}`]
    if(cor && (n >= 0)){
        if(cor.type.includes(effect)){
            let index = cor.type.indexOf(effect);
            cor.type.splice(index, 1)
            cor.type.push("normal")
            // console.log(cor);
        }
        else{
            let index = cor.type.indexOf("normal");
            cor.type.splice(index, 1)
            cor.type.push(effect)
            // console.log(cor);
        }
        map.map[ `cor${x},${y}`] = cor;
        if(v % 2 === 0){
            shurikenDown(x+1, y+1, n-1, v+1, map, effect)
        }
        else{
            shurikenDown(x, y+1, n-1, v+1, map, effect)

        }
    }
}

let shurikenUp = function(x,y,n,v, map,effect){
    cor = map.map[ `cor${x},${y}`]
    if(cor && (n >= 0)){
        if(cor.type.includes(effect)){
            
            let index = cor.type.indexOf(effect);
            cor.type.splice(index, 1)
            cor.type.push("normal")
        }
        else{
            let index = cor.type.indexOf("normal");
                cor.type.splice(index, 1)
            cor.type.push(effect)
        }
        map.map[ `cor${x},${y}`] = cor;
        if(v % 2 === 0){
            shurikenUp(x-1, y-1, n-1, v+1, map, effect)
        }
        else{
            shurikenUp(x, y-1, n-1, v+1, map, effect)

        }
    }
}

let shurikenRight = function(x,y,n,map,effect){
    cor = map.map[ `cor${x},${y}`]
    if(cor && (n >= 0)){
        if(cor.type.includes(effect)){
            let index = cor.type.indexOf(effect);
            cor.type.splice(index, 1)
            cor.type.push("normal")
        }
        else{
            let index = cor.type.indexOf("normal");
                cor.type.splice(index, 1)
            cor.type.push(effect)
        }
        map.map[ `cor${x},${y}`] = cor;
       
            shurikenRight(x+1, y, n-1, map, effect)
    }
}

let shurikenLeft = function(x,y,n,map,effect){
    cor = map.map[ `cor${x},${y}`]
    if(cor && (n >= 0)){
        if(cor.type.includes(effect)){
            let index = cor.type.indexOf(effect);
            cor.type.splice(index, 1)
            cor.type.push("normal")
        }
        else{
            let index = cor.type.indexOf("normal");
                cor.type.splice(index, 1)
            cor.type.push(effect)
        }
        map.map[ `cor${x},${y}`] = cor;
       
            shurikenLeft(x-1, y, n-1, map, effect)
    }
}

let explosionUp = function(x,y,n,map,effect){
    if(n===0){

    }
    else{
    for(let i = 0; i<= n; i++){
        
        
        cor = map.map[`cor${x-i},${y-n}`];
        if(cor && (n >= 0)){
            if(cor.type.includes(effect)){
                let index = cor.type.indexOf(effect);
                cor.type.splice(index, 1)
                cor.type.push("normal")
            }
            else{
                let index = cor.type.indexOf("normal");
                cor.type.splice(index, 1)
                cor.type.push(effect)
            }
            map.map[ `cor${x},${y}`] = cor;
           
                
        }
        
    }

    explosionUp(x, y, n-1, map, effect)

    }
}

let explosionDown = function(x,y,n,map,effect){
    if(n===0){

    }
    else{
    for(let i = 0; i<= n; i++){
        
        
        cor = map.map[`cor${x+i},${y+n}`];
        if(cor && (n > 0)){
            if(cor.type.includes(effect)){
                let index = cor.type.indexOf(effect);
                cor.type.splice(index, 1)
                cor.type.push("normal")
            }
            else{
                let index = cor.type.indexOf("normal");
                cor.type.splice(index, 1)
                cor.type.push(effect)
            }
            map.map[ `cor${x},${y}`] = cor;
           
                
        }
        
    }

    explosionDown(x, y, n-1, map, effect)

    }
}

let explosionRight = function(x,y,n,map,effect){
    if(n===0){

    }
    else{
        for(let i = 1; i<= n; i++){
            cor = map.map[`cor${x+i},${(y-n)+i}`];
        if(cor && (n > 0)){
            if(cor.type.includes(effect)){
                let index = cor.type.indexOf(effect);
                cor.type.splice(index, 1)
                cor.type.push("normal")
            }
            else{
                let index = cor.type.indexOf("normal");
                cor.type.splice(index, 1)
                cor.type.push(effect)
            }
            map.map[ `cor${x},${y}`] = cor;
           
                
        }
            
        }
        for(let i = 1; i< n; i++){
            cor = map.map[`cor${x+n},${y+i}`];
        if(cor && (n > 0)){
            if(cor.type.includes(effect)){
                let index = cor.type.indexOf(effect);
                cor.type.splice(index, 1)
                cor.type.push("normal")
            }
            else{
                let index = cor.type.indexOf("normal");
                cor.type.splice(index, 1)
                cor.type.push(effect)
            }
            map.map[ `cor${x},${y}`] = cor;
           
                
        }
            
        }

    explosionRight(x, y, n-1, map, effect)

    }
}

let explosionLeft = function(x,y,n,map,effect){
    if(n===0){

    }
    else{
        for(let i = 0; i< n; i++){
            cor = map.map[`cor${x-n},${y-i}`];
        if(cor && (n > 0)){
            if(cor.type.includes(effect)){
                let index = cor.type.indexOf(effect);
                cor.type.splice(index, 1)
                cor.type.push("normal")
            }
            else{
                let index = cor.type.indexOf("normal");
                cor.type.splice(index, 1)
                cor.type.push(effect)
            }
            map.map[ `cor${x},${y}`] = cor;
           
                
        }
            
        }
        for(let i = 1; i< n; i++){
            cor = map.map[`cor${(x-n)+i},${y+i}`];
        if(cor && (n > 0)){
            if(cor.type.includes(effect)){
                let index = cor.type.indexOf(effect);
                cor.type.splice(index, 1)
                cor.type.push("normal")
            }
            else{
                let index = cor.type.indexOf("normal");
                cor.type.splice(index, 1)
                cor.type.push(effect)
            }
            map.map[ `cor${x},${y}`] = cor;
           
                
        }
            
        }

    explosionLeft(x, y, n-1, map, effect)

    }
}


let hexagonsInRadius = function( x, y, n, map, smallMap) {
    
    if(n===0){
        
        // console.log('OLD:')
        // console.log(smallMap)
        newmap = []
        let cor2 = Object.assign({},  map.map[ `cor${x},${y}`]);
    
        
        
        cor2.newCor = `cor${0},${0}`
        cor2.oldCor = `cor${x},${y}`

        cor2.x = x;
        cor2.y = y;

        //// console.log(newmap.push(cor2))
        
        smallMap.push(cor2)
        // console.log('NEW:')
        // console.log(smallMap)
        
    }
    else{
        
        for(let i = 0; i<= n; i++){
            // console.log('1:')
            
            //let cor = Object.assign({}, person);
            let cor = Object.assign({}, map.map[`cor${x-i},${y-n}`]);
            
            if(cor === undefined){

                
                var cor1 = {oldCor: ''}
                cor1.oldCor = ``
                cor1.newCor = `cor${0-i},${0-n}`
                
                smallMap.push(cor1)
            }
            else{
      
                cor.oldCor = `cor${x-i},${y-n}`
                cor.newCor = `cor${0-i},${0-n}`
                cor.x = `${x-i}`
                cor.y = `${y-n}`
                // console.log(cor)
                smallMap.push(cor)
            }
            
        }
        for(let i = 0; i<= n; i++){
            // console.log('2:')
            
            
            let cor = Object.assign({}, map.map[ `cor${x+i},${y+n}`]);
            if(cor === undefined){
                var cor1 = {oldCor: ''}
                cor1.oldCor = ``
                cor1.newCor = `cor${0+i},${0+n}`
                smallMap.push(cor1)
                
            }
            
            else{
                
                cor.newCor = `cor${0+i},${0+n}`
                cor.oldCor = `cor${x+i},${y+n}`
                cor.x = `${x+i}`
                cor.y = `${y+n}`
                // console.log(cor)
                smallMap.push(cor)
            }
            
        }
        for(let i = 1; i<= n; i++){
            // console.log('3:')
            
            let cor = Object.assign({}, map.map[`cor${x+i},${(y-n)+i}`]);
            if(cor === undefined){
                
                var cor1 = {oldCor: ''}
                cor1.oldCor = ``
                cor1.newCor = `cor${0+i},${(0-n)+i}`
                smallMap.push(cor1)
            }
            
            else{
                
                cor.oldCor = `cor${x+i},${(y-n)+i}`
                cor.newCor = `cor${0+i},${(0-n)+i}`
                cor.x = `${x+i}`
                cor.y = `${(y-n)+i}`
                
                // console.log(cor)
                smallMap.push(cor)
            }
            
        }
        for(let i = 1; i< n; i++){
            // console.log('4:')
         
            
            let cor = Object.assign({}, map.map[ `cor${x+n},${y+i}`]);
            if(cor === undefined){
                var cor1 = {oldCor: ''}
                cor1.oldCor = ``
                cor1.newCor = `cor${0+n},${y+i}`
                
                smallMap.push(cor1)
            }
            else{
                
                cor.oldCor = `cor${x+n},${y+i}`
                cor.newCor = `cor${0+n},${0+i}`
                cor.x = `${x+n}`
                cor.y = `${y+i}`
                // console.log(cor)
                smallMap.push(cor)
            }
            
        }
        for(let i = 0; i< n; i++){
            // console.log('5:')
        
            
            let cor = Object.assign({}, map.map[ `cor${x-n},${y-i}`]);
            if(cor === undefined){
                var cor1 = {oldCor: ''}
                cor1.oldCor = ``
                cor1.newCor = `cor${0-n},${0-i}`
                smallMap.push(cor1)
            }
            else{
                
                cor.oldCor = `cor${x-n},${y-i}`
                cor.newCor = `cor${0-n},${0-i}`
                cor.x = `${x-n}`
                cor.y = `${y-i}`
                // console.log(cor)
                smallMap.push(cor)
            }
            
        }
        for(let i = 1; i< n; i++){
            // console.log('6:')
         
            let cor = Object.assign({}, map.map[ `cor${(x-n)+i},${y+i}`]);
            if(cor === undefined){
                var cor1 = {oldCor: ''}
                cor1.oldCor = ``
                cor1.newCor = `cor${(0-n)+i},${0+i}`
                smallMap.push(cor1)
            }
            else{
                
                cor.oldCor = `cor${(x-n)+i},${y+i}`
                cor.newCor = `cor${(0-n)+i},${0+i}`
                cor.x = `${(x-n)+i}`
                cor.y = `${y+i}`
                // console.log(cor)
                smallMap.push(cor)
            }
            
            
        }
        hexagonsInRadius(x,y,n-1,map,smallMap);
    }
  };

router.post('/generate', function (req, res) {
   

    Map
    .findById(req.body.mapID)
    .exec(function (err, map) {
      if (err) return res.status(500).end(err);
      User.findOne({ displayName: req.body.ninja }, function (err, ninja) {
        User.findOne({ displayName: req.body.monster }, function (err, monster) {
            

            
            randomneg1 =  (Math.random() * 100)
            randomneg2 =  (Math.random() * 100)
            randomx = Math.floor(Math.random() * 10 + 2); 
            randomy = Math.floor(Math.random() * 10 + 2); 
            if(randomneg1 > 50){
                randomx = (randomx * -1) +12
            }
            if(randomneg2 > 50){
                randomy = (randomy * -1) +12
            }
            // console.log(randomy)
            // console.log(randomx)
            // console.log
            map.map[`cor${randomx},${randomy}`].players.push(req.body.ninja);
            map.map[`cor20,19`].players.push(req.body.monster);
      const newNinja = new Ninja({displayName: req.body.ninja, health: 10, x: randomx, y:randomy})  
      const newMonster  = new Monster({displayName: req.body.monster, health: 10, x: 20, y:19})  
      
      
      newNinja.save(function(err, ninja){
        if (err) return res.status(500).end(err);
        newMonster.save(function(err, monster){
            if (err) return res.status(500).end(err);
                let ninjas = [];
                let monsters = [];
                ninjas.push(ninja);
                monsters.push(monster);
                // console.log(ninja);
                // console.log(monster);
                
            const newMatch = new Match({matchMap: map,  matchNinjas: ninjas, matchMonsters: monsters});
            newMatch.save(function(err, match){
                if (err) return res.status(500).end(err);
                
                
                
                return res.json(match._id);
                }       
                    );
            }       
                );
        
        }       
            );

      
        });
    });

    });
});

router.get('/', function (req, res) {
      
    Match
    .findById(req.body.matchID)
    .exec(function (err, match) {
      if (err) return res.status(500).end(err);
      return res.json(match);
    });
  
});

router.post('/ninjas', function (req, res) {
      
    Match
    .findById(req.body.matchID)
    .exec(function (err, match) {
      if (err) return res.status(500).end(err);
      return res.json(match.matchNinjas);
    });
  
});

router.post('/monsters', function (req, res) {
      
    Match
    .findById(req.body.matchID)
    .exec(function (err, match) {
      if (err) return res.status(500).end(err);
      return res.json(match.matchMonsters);
    });
  
});

router.delete('/', function(req, res){

    Ninja.deleteOne({displayName: req.body.ninjaName}, function(err){
        if (err) return res.status(500).end(err);
        Monster.deleteOne({displayName: req.body.monsterName}, function(err){
            if (err) return res.status(500).end(err);
            Match.deleteOne({_id: req.body.matchID}, function(err){
                if (err) return res.status(500).end(err);
                res.json("Match has been deleted")
            }
            );
        }
        );
    }
    );
})

router.patch('/monsters/:player/health', function (req, res) {
   

Match
  .findById(req.body.matchID)
  .exec(function (err, match) {
      if (err) return res.status(500).end(err);

      Monster.find({displayName: req.params.player}, function(err, monsters){
          if (err) return res.status(500).end(err);
      
          var health = (monsters[0].health - parseInt(req.query.damage));
          
      Monster.findOneAndUpdate({displayName: req.params.player}, {health: health}, {new: true}, function(err, newmonster){
          if (err) return res.status(500).end(err);

          Match.findByIdAndUpdate(req.body.matchID, {matchMonsters: [newmonster]}, {new: true}, function (err, newmatch) {
          if (err) return res.status(500).end(err);
         
          return res.json(health);
        }  );
      });
  });

  })

});

router.patch('/ninjas/:player/health', function (req, res) {
   

Match
    .findById(req.body.matchID)
    .exec(function (err, match) {
        if (err) return res.status(500).end(err);
   
        Ninja.find({displayName: req.params.player}, function(err, ninjas){
            if (err) return res.status(500).end(err);

            var health = (ninjas[0].health - parseInt(req.query.damage));
            
        Ninja.findOneAndUpdate({displayName: req.params.player}, {health: health}, {new: true}, function(err, newninja){
            if (err) return res.status(500).end(err);
   
            Match.findByIdAndUpdate(req.body.matchID, {matchNinjas: [newninja]}, {new: true}, function (err, newmatch) {
            if (err) return res.status(500).end(err);

            return res.json(health);
          }  );
        });
    });

    })
  
});



//sample call 'map/source?x=2&y=2&radius=2
router.post('/source', function (req, res) {
    Match
    .findById(req.body.matchID)
    .exec(function (err, match) {
      if (err) return res.status(500).end(err);
      map = match.matchMap;

      var smallMap = []
     
      hexagonsInRadius(parseInt(req.query.x), parseInt(req.query.y), parseInt(req.query.radius), map, smallMap)
      
      return res.json(smallMap);
    });

});

//sample call 'map/up?x=2&y=2&range=2
router.patch('/shuriken/:direction', function (req, res) {
    Match
    .findById(req.body.matchID)
    .exec(function (err, match) {
      if (err) return res.status(500).end(err);
      map = match.matchMap;
      switch(req.params.direction){
        case "up":
            shurikenUp(parseInt(req.query.x), parseInt(req.query.y), parseInt(req.query.range), 0, map, req.body.effect);
            break;
        case "down":
            shurikenDown(parseInt(req.query.x), parseInt(req.query.y), parseInt(req.query.range), 0, map, req.body.effect);
            break;
        case "right":
            shurikenRight(parseInt(req.query.x), parseInt(req.query.y), parseInt(req.query.range), map, req.body.effect);
            break;
        case "left":
            shurikenLeft(parseInt(req.query.x), parseInt(req.query.y), parseInt(req.query.range), map, req.body.effect);
            break;
      }
      Match.findByIdAndUpdate(req.body.matchID, {matchMap: map},{new: true},function (err, newmatch) {
        if (err) return res.status(500).end(err);
        return res.json(newmatch);
      }  )

    });

});


router.patch('/explosion/:direction', function (req, res) {
    Match
    .findById(req.body.matchID)
    .exec(function (err, match) {
      if (err) return res.status(500).end(err);
      map = match.matchMap;
      switch(req.params.direction){
        case "up":
            explosionUp(parseInt(req.query.x), parseInt(req.query.y), parseInt(req.query.range), map, req.body.effect);
            break;
        case "down":
            explosionDown(parseInt(req.query.x), parseInt(req.query.y), parseInt(req.query.range), map, req.body.effect);
            break;
        case "right":
            explosionRight(parseInt(req.query.x), parseInt(req.query.y), parseInt(req.query.range), map, req.body.effect);
            break;
        case "left":
            explosionLeft(parseInt(req.query.x), parseInt(req.query.y), parseInt(req.query.range), map, req.body.effect);
            break;
      }
      Match.findByIdAndUpdate(req.body.matchID, {matchMap: map}, {new: true}, function (err, newmatch) {
        if (err) return res.status(500).end(err);
        return res.json(newmatch);
      }  )

    });

});


router.patch('/move/:player', function (req, res) {
    Match
    .findById(req.body.matchID)
    .exec(function (err, match) {
      if (err) return res.status(500).end(err);
      map = match.matchMap;
      
      cor1 = map.map[`cor${req.query.srcx},${req.query.srcy}`]
      cor2 = map.map[`cor${req.query.tarx},${req.query.tary}`]

      // console.log("okoaksdoasid");
      // console.log(cor1);
      // console.log(cor2);

        let index = cor1.players.indexOf(req.params.player);
        cor1.players.splice(index, 1)
        cor2.players.push(req.params.player)

        // console.log(cor2.players);
        
        map.map[`cor${req.query.srcx},${req.query.srcy}`] = cor1
        map.map[`cor${req.query.tarx},${req.query.tary}`] = cor2
        for(i=0; i<match.matchNinjas.length; i++){
            // console.log("SDIJMO");

        // console.log(match.matchNinjas)
        // console.log(req.params.player)
        // console.log(req.query.tarx);
        // console.log(req.query.tary);

        // console.log(req.query.srcx);

        // console.log(req.query.srcy);


        if(match.matchNinjas[i].displayName == req.params.player){
            Ninja.findOneAndUpdate({displayName: req.params.player}, {x: req.query.tarx, y: req.query.tary}, {new: true}, function(err, newninja){
                if (err) return res.status(500).end(err);
                // console.log(newninja)
                Match.findByIdAndUpdate(req.body.matchID, {matchMap: map, matchNinjas: [newninja]}, {new: true}, function (err, newmatch) {
                if (err) return res.status(500).end(err);
    
                return res.json(newmatch);
              }  );
            });
        }
    }
    for(i=0; i<match.matchMonsters.length; i++){
        if(match.matchMonsters[i].displayName == req.params.player){
            Monster.findOneAndUpdate({displayName: req.params.player}, {x: req.query.tarx, y: req.query.tary}, {new: true}, function(err, newmonster){
                if (err) return res.status(500).end(err);
                Match.findByIdAndUpdate(req.body.matchID, {matchMap: map, matchMonsters: [newmonster]}, {new: true}, function (err, newmatch) {
                if (err) return res.status(500).end(err);
    
                return res.json(newmatch);
              }  );
            });
        }
    }
        /*
        if(cor.type.includes(effect)){
            let index = cor.type.indexOf(effect);
            cor.type.splice(index, 1)
        }
        else{
            cor.type.push(effect)
        }
        Ninja.findOneAndUpdate({displayName: req.params.player}, {x: req.query.tarx, y: req.query.tary}, {new: true}, function(err, newninja){
            if (err) return res.status(500).end(err);
            Match.findByIdAndUpdate(req.body.matchID, {matchMap: map}, {new: true}, function (err, newmatch) {
            if (err) return res.status(500).end(err);

            return res.json(newmatch);
          }  );
        });
        */
      

    });

});

router.patch('/clear', function (req, res) {
    Match
    .findById(req.body.matchID)
    .exec(function (err, match) {
      if (err) return res.status(500).end(err);

      var map = match.matchMap;

      for (cor in map.map) {

        map.map[cor].type = ["normal"]
      }

      Match.findByIdAndUpdate(req.body.matchID, {matchMap: map},{new: true},function (err, newmatch) {
        if (err) return res.status(500).end(err);
        return res.json(newmatch);
      }  )

    });

});

module.exports = router;

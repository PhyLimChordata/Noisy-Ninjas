const maps = require('../schemas/map')

const hexagonsInRadius = function( x, y, n, map, smallMap) {
    
  if(n===0){
      
      newmap = []
      let cor2 = Object.assign({},  map.map[ `cor${x},${y}`]);
  
      
      
      cor2.newCor = `cor${0},${0}`;
      cor2.oldCor = `cor${x},${y}`;
      cor2.x = x;
      cor2.y = y;

     
      
      smallMap.push(cor2);
   
  }
  else{
      
      for(let i = 0; i<= n; i++){
        
          let cor = Object.assign({}, map.map[`cor${x-i},${y-n}`]);
          
          if(cor === undefined){

              
              var cor1 = {oldCor: ''};
              cor1.oldCor = ``;
              cor1.newCor = `cor${0-i},${0-n}`;
              smallMap.push(cor1);
          }
          else{
    
              cor.oldCor = `cor${x-i},${y-n}`;
              cor.newCor = `cor${0-i},${0-n}`;
              cor.x = `${x-i}`;
              cor.y = `${y-n}`;

              smallMap.push(cor);
          }
          
      }
      for(let i = 0; i<= n; i++){
          
          
          let cor = Object.assign({}, map.map[ `cor${x+i},${y+n}`]);
          if(cor === undefined){
              let cor1 = {oldCor: ''};
              cor1.oldCor = ``;
              cor1.newCor = `cor${0+i},${0+n}`;
              smallMap.push(cor1);
              
          }
          
          else{
              
              cor.newCor = `cor${0+i},${0+n}`;
              cor.oldCor = `cor${x+i},${y+n}`;
              cor.x = `${x+i}`;
              cor.y = `${y+n}`;
              smallMap.push(cor);
          }
          
      }
      for(let i = 1; i<= n; i++){

          
          let cor = Object.assign({}, map.map[ `cor${x+i},${(y-n)+i}`]);
          if(cor === undefined){
              
              let cor1 = {oldCor: ''};
              cor1.oldCor = ``;
              cor1.newCor = `cor${0+i},${(0-n)+i}`;
              smallMap.push(cor1);
          }
          
          else{
              
              cor.oldCor = `cor${x+i},${(y-n)+i}`;
              cor.newCor = `cor${0+i},${(0-n)+i}`;
              cor.x = `${x+i}`;
              cor.y = `${(y-n)+i}`;
              smallMap.push(cor);
          }
          
      }
      for(let i = 1; i< n; i++){
       
          
          let cor = Object.assign({}, map.map[ `cor${x+n},${y+i}`]);
          if(cor === undefined){
              let cor1 = {oldCor: ''}
              cor1.oldCor = ``
              cor1.newCor = `cor${0+n},${y+i}`
              
              smallMap.push(cor1)
          }
          else{
              
              cor.oldCor = `cor${x+n},${y+i}`
              cor.newCor = `cor${0+n},${0+i}`
              cor.x = `${x+n}`
              cor.y = `${y+i}`
              smallMap.push(cor)
          }
          
      }
      for(let i = 0; i< n; i++){

          
          let cor = Object.assign({}, map.map[ `cor${x-n},${y-i}`]);
          if(cor === undefined){
              let cor1 = {oldCor: ''}
              cor1.oldCor = ``
              cor1.newCor = `cor${0-n},${0-i}`
              smallMap.push(cor1)
          }
          else{
              
              cor.oldCor = `cor${x-n},${y-i}`
              cor.newCor = `cor${0-n},${0-i}`
              cor.x = `${x-n}`
              cor.y = `${y-i}`
              smallMap.push(cor)
          }
          
      }
      for(let i = 1; i< n; i++){
       
          let cor = Object.assign({}, map.map[ `cor${(x-n)+i},${y+i}`]);
          if(cor === undefined){
              let cor1 = {oldCor: ''};
              cor1.oldCor = ``;
              cor1.newCor = `cor${(0-n)+i},${0+i}`;
              smallMap.push(cor1);
          }
          else{
              
              cor.oldCor = `cor${(x-n)+i},${y+i}`;
              cor.newCor = `cor${(0-n)+i},${0+i}`;
              cor.x = `${(x-n)+i}`;
              cor.y = `${y+i}`;
              smallMap.push(cor);
          }
          
          
      }
      hexagonsInRadius(x,y,n-1,map,smallMap);
  }
};


module.exports = async (req, res) => {
  let map = await maps.find();
  smallMap = [];
  hexagonsInRadius(parseInt(req.query.x), parseInt(req.query.y), parseInt(req.query.radius), map[0], smallMap);
  return res.json(smallMap);
}

import React, { useState, useEffect } from 'react'
import '../../style/hexagon.css'
import { Hexagon } from './Hexagon'

import { movePlayer, newPOV, shuriken } from "../../apiService";

export function HexagonGrid(props) {
  const {mode, setMode, setTimer, POV, x, y} = props;
  const [type, setType] = useState(POV);
  const [srcx, setSrcX] = useState(x);
  const [srcy, setSrcY] = useState(y);

  const update = (x, y, direction) => {
    if (mode === "move") {
      console.log("SOURCE X: " + srcx);
      console.log("SOURCE Y: " + srcy);
      console.log("XA: " + x);
      console.log("YA: " + y);

      updatePOV(x, y, 3);
      setSrcX(x);
      setSrcY(y);
    }

    if (mode === "direction-S") {
      if (!throwShuriken(3, direction)) {
        return;
      }
    }

    if (mode === "direction-E") {
      if (!throwBomb(3, direction)) {
        return;
      }
    }

    updateMode();
  }

  const updateMode = () => {
    if (mode === "move") {
      setMode("action");
      document.getElementById("move1").style.visibility = "visible";
      document.getElementById("move2").style.visibility = "visible";
      document.getElementById("move3").style.visibility = "visible";
      document.getElementById("move4").style.visibility = "visible";
      setTimer(5); 
    } else if (mode === "direction-S" || mode === "direction-E" || mode === "direction") {
      setMode("wait");
      console.log(mode);
      setTimer(0);
    } else if (mode === "wait") {
      setMode("move");

      console.log(mode);
      setTimer(5);
      //TODO: Delete after testing iss finished 
    }
  }

  const updatePOV = (x=-1, y=-1, radius=0) => {
    if (x === -1) {
      return;
    }

    let grid = {};
  
    console.log("FRONTEND:")
    console.log(srcx);
    console.log(srcy);
    console.log();
    console.log(x);
    console.log(y);
  
    movePlayer(srcx, srcy, x, y);

    newPOV(x,y,radius).then((hexes) => {
      hexes.forEach((hex) => {
        grid[hex["newCor"]] = hex;
      });
        setType(grid)
      });
    }

  const throwShuriken = (range=0, direction) => {
    let dir = "up";
    let dirLetter= direction.slice(2, direction.length-1);
    console.log(dirLetter);

    if (dirLetter == "U") {
      dir = "up";
    } else if (dirLetter == "D") {
      dir = "down";
    } else if (dirLetter == "L") {
      dir = "left";
    } else if (dirLetter == "R") {
      dir = "right";
    } else {
      return false;
    }
    shuriken(dir, srcx, srcy);

    return true;
  }

  const throwBomb = (range=0, direction) => {
    let dirLetter= direction.slice(2, direction.length-1);

    if (dirLetter.length == 2) {
      dirLetter = dirLetter.slice(0, dirLetter.length-1);
    }

    let dir = "up";
    if (dirLetter == "U") {
      dir = "up";
    } else if (dirLetter == "D") {
      dir = "down";
    } else if (dirLetter == "L") {
      dir = "left";
    } else if (dirLetter == "R") {
      dir = "right";
    } else {
      return false;
    }
    // http://localhost:3000/match/explosion/${dir}?x=${srcx}&y={srcy}&range=3
    return true;
  }

  let showDirection = (id, range) => {
    if (mode === "direction-S") {
      if (id.slice(0,1) != "S") {
        return;
      }
      id = id.slice(0, id.length - 1);
      for (let i = 1; i < range + 1; i++) {
        document.getElementById("hex" + id + i).style.backgroundColor = 'orange';
      }
    } else if (mode === "direction-E") {
      id = id.slice(0, id.length - 1);

      let dir = id.slice(2,id.length);
      let prefix = id.slice(0,2);
      if (id.length == 4) {
        dir = id.slice(id.length-2, id.length-1);
      }
      let i = 1;
      while (document.getElementById("hex" + prefix + dir + i)) {
        document.getElementById("hex" + prefix + dir + i).style.backgroundColor = 'orange';
        i++;
      }

      if (dir) {
        i = 1; 
        while(document.getElementById("hex" + prefix + dir + "L" + i)) {
          document.getElementById("hex" + prefix + dir + "L" + i).style.backgroundColor = 'orange';
          i++;
        } 

        i = 1;
        while(document.getElementById("hex" + prefix + dir + "R" + i)) {
          document.getElementById("hex" + prefix + dir + "R" + i).style.backgroundColor = 'orange';
          i++;
        } 
        i++;
      }
    }
  }

  let unshowdirection = (id, range) => {
    if (mode === "direction-S") {
      if (id.slice(0,1) != "S") {
        return;
      }
      id = id.slice(0, id.length - 1);
      for (let i = 1; i < range + 1; i++) {
        document.getElementById("hex" + id + i).style.backgroundColor = '#9980fa';
      } 
    }
    else if (mode === "direction-E") {
      id = id.slice(0, id.length - 1);

      let dir = id.slice(2,id.length);
      let prefix = id.slice(0,2);
      if (id.length == 4) {
        dir = id.slice(id.length-2, id.length-1);
      }
      let i = 1;
      while (document.getElementById("hex" + prefix + dir + i)) {
        document.getElementById("hex" + prefix + dir + i).style.backgroundColor = '#9980fa';
        i++;
      }

      if (dir) {
        i = 1; 
        while(document.getElementById("hex" + prefix + dir + "L" + i)) {
          document.getElementById("hex" + prefix + dir + "L" + i).style.backgroundColor = '#9980fa';
          i++;
        } 

        i = 1;
        while(document.getElementById("hex" + prefix + dir + "R" + i)) {
          document.getElementById("hex" + prefix + dir + "R" + i).style.backgroundColor = '#9980fa';
          i++;
        } 
      }
    }
  }  
 
  return <div className="main">
    <Hexagon id= {mode === "direction-E" ? "E-UL1" : "A1"} info={type["cor-3,-3"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id = {mode === "direction-E" ? "E-U1" : mode === "direction-S" ? "S-U1" : "A2"} info={type["cor-2,-3"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/> 
    <Hexagon id = {mode === "direction-E" ? "E-U2" : "A3"} info={type["cor-1,-3"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id= {mode === "direction-E" ? "E-UR1" : "A4"} info={type["cor0,-3"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>

    <Hexagon id= {mode === "direction-E" ? "E-L1" : "B1"} info={type["cor-3,-2"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id = {mode === "direction-E" ? "E-UL2" : "B2"} info={type["cor-2,-2"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id = {mode === "direction-E" ? "E-U3" : mode === "direction-S" ? "S-U2" : "B3"} info={type["cor-1,-2"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id = {mode === "direction-E" ? "E-UR2" : "B4"} info={type["cor0,-2"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id= {mode === "direction-E" ? "E-R1" : "B5"} info={type["cor1,-2"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>

    <Hexagon id= {mode === "direction-E" ? "E-L2" : "C1"} info={type["cor-3,-1"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id= {mode === "direction-E" ? "E-L3" : "C2"} info={type["cor-2,-1"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id = {mode === "direction-E" ? "E-UL3" : mode === "direction-S" ? "S-U3" : "C3"} info={type["cor-1,-1"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id= {mode === "direction-E" ? "E-UR3" : "C4"} info={type["cor0,-1"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id= {mode === "direction-E" ? "E-R2" :"C5"} info={type["cor1,-1"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id= {mode === "direction-E" ? "E-R3" :"C6"} info={type["cor2,-1"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>

    <Hexagon id = {mode === "direction-E" ? "E-L4" : mode === "direction-S" ? "S-L1" : "D1"} info={type["cor-3,0"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id = {mode === "direction-E" ? "E-L5" : mode === "direction-S" ? "S-L2" : "D2"}  info={type["cor-2,0"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id = {mode === "direction-E" ? "E-L6" : mode === "direction-S" ? "S-L3" : "D3"}  info={type["cor-1,0"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id="D4" info={type["cor0,0"]} mode={mode} onClick = {update}/>
    <Hexagon id = {mode === "direction-E" ? "E-R4" : mode === "direction-S" ? "S-R3" : "D5"}  info={type["cor1,0"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id = {mode === "direction-E" ? "E-R5" : mode === "direction-S" ? "S-R2" : "D6"}  info={type["cor2,0"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id = {mode === "direction-E" ? "E-R6" : mode === "direction-S" ? "S-R1" : "D7"}  info={type["cor3,0"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>

    <Hexagon id={mode === "direction-E" ? "E-L7" : "E1"} info={type["cor-2,1"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id={mode === "direction-E" ? "E-L8" : "E2"} info={type["cor-1,1"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id={mode === "direction-E" ? "E-DL1" : "E3"} info={type["cor0,1"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id = {mode === "direction-E" ? "E-DR1" : mode === "direction-S" ? "S-D3" : "E4"}  info={type["cor1,1"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id= {mode === "direction-E" ? "E-R7" : "E5"} info={type["cor2,1"]} mode={mode}onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id={mode === "direction-E" ? "E-R8" : "E6"} info={type["cor3,1"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>

    <Hexagon id={mode === "direction-E" ? "E-L9" : "F1"} info={type["cor-1,2"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id={mode === "direction-E" ? "E-DL2" : "F2"} info={type["cor0,2"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id = {mode === "direction-E" ? "E-D1" : mode === "direction-S" ? "S-D2" : "F3"}  info={type["cor1,2"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection} />
    <Hexagon id= {mode === "direction-E" ? "E-DR2" : "F4"} info={type["cor2,2"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id={mode === "direction-E" ? "E-R9" : "F5"} info={type["cor3,2"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>

    <Hexagon id= {mode === "direction-E" ? "E-DL3" : "G1"} info={type["cor0,3"]} mode={mode} onClick = {update}/>
    <Hexagon id={mode === "direction-E" ? "E-D2" : "G2"} info={type["cor1,3"]} mode={mode} onClick = {update}/>
    <Hexagon id = {mode === "direction-E" ? "E-D3" : mode === "direction-S" ? "S-D1" : "G3"}  info={type["cor2,3"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id={mode === "direction-E" ? "E-DR3" : "G4"} info={type["cor3,3"]} mode={mode} onClick = {update}/>

    {/* <Hexagon id="A1" info={type["cor-3,-3"]} mode={mode} onClick = {update}/>
    <Hexagon id = {mode === "direction-S" ? "S-U1" : "A2"} info={type["cor-2,-3"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/> 
    <Hexagon id="A3" info={type["cor-1,-3"]} mode={mode} onClick = {update}/>
    <Hexagon id="A4" info={type["cor0,-3"]} mode={mode} onClick = {update}/>

    <Hexagon id="B1" info={type["cor-3,-2"]} mode={mode} onClick = {update}/>
    <Hexagon id="B2" info={type["cor-2,-2"]} mode={mode} onClick = {update}/>
    <Hexagon id = {mode === "direction-S" ? "S-U2" : "B3"} info={type["cor-1,-2"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id="B4" info={type["cor0,-2"]} mode={mode} onClick = {update}/>
    <Hexagon id="B5" info={type["cor1,-2"]} mode={mode} onClick = {update}/>

    <Hexagon id="C1" info={type["cor-3,-1"]} mode={mode} onClick = {update}/>
    <Hexagon id="C2" info={type["cor-2,-1"]} mode={mode} onClick = {update}/>
    <Hexagon id = {mode === "direction-S" ? "S-U3" : "C3"} info={type["cor-1,-1"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id="C4" info={type["cor0,-1"]} mode={mode} onClick = {update}/>
    <Hexagon id="C5" info={type["cor1,-1"]} mode={mode} onClick = {update}/>
    <Hexagon id="C6" info={type["cor2,-1"]} mode={mode} onClick = {update}/>

    <Hexagon id = {mode === "direction-S" ? "S-L1" : "D1"} info={type["cor-3,0"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id = {mode === "direction-S" ? "S-L2" : "D2"}  info={type["cor-2,0"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id = {mode === "direction-S" ? "S-L3" : "D3"}  info={type["cor-1,0"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id="D4" info={type["cor0,0"]} mode={mode} onClick = {update}/>
    <Hexagon id = {mode === "direction-S" ? "S-R3" : "D5"}  info={type["cor1,0"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id = {mode === "direction-S" ? "S-R2" : "D6"}  info={type["cor2,0"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id = {mode === "direction-S" ? "S-R1" : "D7"}  info={type["cor3,0"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>

    <Hexagon id="E1" info={type["cor-2,1"]} mode={mode} onClick = {update}/>
    <Hexagon id="E2" info={type["cor-1,1"]} mode={mode} onClick = {update}/>
    <Hexagon id="E3" info={type["cor0,1"]} mode={mode} onClick = {update}/>
    <Hexagon id = {mode === "direction-S" ? "S-D3" : "E4"}  info={type["cor1,1"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id="E5" info={type["cor2,1"]} mode={mode}onClick = {update}/>
    <Hexagon id="E6" info={type["cor3,1"]} mode={mode} onClick = {update}/>

    <Hexagon id="F1" info={type["cor-1,2"]} mode={mode} onClick = {update}/>
    <Hexagon id="F2" info={type["cor0,2"]} mode={mode} onClick = {update}/>
    <Hexagon id = {mode === "direction-S" ? "S-D2" : "F3"}  info={type["cor1,2"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection} />
    <Hexagon id="F4" info={type["cor2,2"]} mode={mode} onClick = {update}/>
    <Hexagon id="F5" info={type["cor3,2"]} mode={mode} onClick = {update}/>

    <Hexagon id="G1" info={type["cor0,3"]} mode={mode} onClick = {update}/>
    <Hexagon id="G2" info={type["cor1,3"]} mode={mode} onClick = {update}/>
    <Hexagon id = {mode === "direction-S" ? "S-D1" : "G3"}  info={type["cor2,3"]} mode={mode} onClick = {update} hover={showDirection} unhover={unshowdirection}/>
    <Hexagon id="G4" info={type["cor3,3"]} mode={mode} onClick = {update}/> */}
  </div>
}

import React, {useEffect, useRef, useState} from 'react';
import { HexagonGrid } from "../components/hexagon/HexagonGrid";
import { Overlay } from "../components/Overlay";
import { Character } from "../components/Character";

// import { ShurikenDirection } from "../components/ShurikenDirection";
// import { ExplosionDirection } from "../components/ExplosionDirection";

import { newPOV } from "../apiService";

export function GameScreen (props)  {
  const [mode, setMode] = useState("move");
  const [loaded, setLoaded] = useState(false);
  const [POV, setPOV] = useState({})
  const [timer, setTimer] = useState(5)
  const modeRef = useRef(mode)
  const timerRef = useRef(timer)

  useEffect (() => {
    timerRef.current = timer
  }, [timer]);

  useEffect (() => { 
    modeRef.current = mode
  }, [mode]);
  
  useEffect (() => {
    setInterval(() => {
      if (timerRef.current === 0 && modeRef.current !== "wait") {
        setTimer(5)
        if (modeRef.current === "move") {
          setMode("action");
          document.getElementById("move1").style.visibility = "visible";
          document.getElementById("move2").style.visibility = "visible";
          document.getElementById("move3").style.visibility = "visible";
          document.getElementById("move4").style.visibility = "visible";
        }
          else if (modeRef.current === "action" || modeRef.current === "direction-S" || modeRef.current === "direction-E" || modeRef.current === "direction") {
          setMode("wait");
          setTimer(0);
          //socket time
          document.getElementById("move1").style.visibility = "hidden";
          document.getElementById("move2").style.visibility = "hidden";
          document.getElementById("move3").style.visibility = "hidden";
          document.getElementById("move4").style.visibility = "hidden";
        } else if (modeRef.current === "wait") {
          setMode("move");
        }
      } else if (timerRef.current > 0) {
        setTimer(timerRef.current - 1)
      }
    }, 1000);
    
  }, []);

  let grid = {};
  if (!loaded) {
//     http://localhost:3000/match/ninjas
// {
//     "matchID": "62d5e0a452086a8d4671e528"
// }
// .then((ninjas) => {
// ninjas.forEach((ninja) => {
// if ninja.displayName === cookie.displayName
// TODO: Update 3 with the ninja.x and ninja.y
    newPOV(3,3,3).then((hexes) => {
      hexes.forEach((hex) => {
        grid[hex["newCor"]] = hex;
      });
      setPOV(grid)
      setLoaded(true);
    }); 
// })
// })

     
  }
  
  return <div className = "gamescreen">
      {/* <ShurikenDirection mode={"-shuriken-" + mode} setMode={setMode}/>
      <ExplosionDirection mode={mode} setMode={setMode}/> */}
      <Overlay mode={mode} timer={timer} setMode={setMode} setTimer={setTimer}/>
      <Character role="ninja"/>
      {loaded && <HexagonGrid POV={POV} mode={mode} setMode={setMode} setTimer={setTimer}/>}
      
  </div>
}

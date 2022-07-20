import React, {useEffect, useRef, useState} from 'react';
import { HexagonGrid } from "../components/hexagon/HexagonGrid";
import { Overlay } from "../components/Overlay";
import { Character } from "../components/Character";

import { newPOV, getNinjas, getUsername, getUser, getMonsters } from "../apiService";

export function GameScreen (props)  {
  const [role, setRole] = useState("ninja");
  getUser(getUsername()).then((user) => {
    setRole(user.role);
  });

  const [mode, setMode] = useState("move");
  const [loaded, setLoaded] = useState(false);
  const [POV, setPOV] = useState({})
  const [timer, setTimer] = useState(5)
  const modeRef = useRef(mode)
  const timerRef = useRef(timer)

  //TODO: Set hearts based on role
  const [hearts, setHearts] = useState(role === "ninja" ? 3 : 5);

  useEffect (() => {
    timerRef.current = timer
  }, [timer]);

  useEffect (() => { 
    modeRef.current = mode
  }, [mode]);
  
  useEffect (() => {
    setInterval(() => {
      if (timerRef.current === 0 && modeRef.current !== "wait" && modeRef.current !== "dead" && modeRef.current !== "monster won" && modeRef.current !== "ninjas won") {
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
  
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  if (!loaded) {
    if (role === "ninja") {
      getNinjas().then((ninjas) => {
        let live = false;
  
        ninjas.forEach((ninja) => {
          if (ninja.health !== 0) {
            live = true;
          };
  
          if (ninja.displayName === getUsername()) {
            newPOV(ninja.x,ninja.y,3).then((hexes) => {
              hexes.forEach((hex) => {
                grid[hex["newCor"]] = hex;
              });
              setPOV(grid)
              setLoaded(true);
              setHearts(ninja.health);
              setX(ninja.x);
              setY(ninja.y);
            })
          }
        });
  
        if (!live) {
          setMode("monster won");
          setTimer(0);
        } else {
          ninjas.forEach((ninja) => {
            if (ninja.displayName === getUsername()) {
                if (ninja.health === 0) {
                  setMode("dead");
                  setTimer(0);
                }
            }
          });  
        }
    }) 
    } else {
      getMonsters().then((monsters) => {
        monsters.forEach((monster) => {
          console.log(monster.displayName);
          console.log(getUsername());
          if (monster.displayName === getUsername()) {
            console.log("hit");
            newPOV(monster.x,monster.y,3).then((hexes) => {
              console.log(hexes);
              hexes.forEach((hex) => {
                grid[hex["newCor"]] = hex;
              });
              setPOV(grid)
              setLoaded(true);
              setHearts(monster.health);
              setX(monster.x);
              setY(monster.y);

              if (monster.health === 0) {
                setMode("ninjas won");
                setTimer(0);
              }
            })
          }
        });
      })
    }
   
}
  
  return <div className = "gamescreen">
      <Overlay role={role} mode={mode} timer={timer} setMode={setMode} setTimer={setTimer} hearts={hearts}/>
      <Character role={role}/>
      {loaded && <HexagonGrid role={role} POV={POV} mode={mode} setMode={setMode} setTimer={setTimer} x={x} y={y} setHearts={setHearts} hearts={hearts}/>}
  </div>
}

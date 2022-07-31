import React, { useEffect, useRef, useState } from 'react'
import { HexagonGrid } from '../components/hexagon/HexagonGrid'
import { Overlay } from '../components/Overlay'
import { Character } from '../components/Character'

import {
  newPOV,
  getNinjas,
  getUsername,
  getUser,
  getMonsters,
} from '../apiService'
import { ConfirmationPopup } from '../components/popups/ConfirmationPopup'
import { useNavigate, useLocation } from 'react-router'

import {client} from '../components/popups/QueuePopup';

export function GameScreen() {
  const routeProps = useLocation().state;
  const matchID = routeProps.matchID;

  const [role, setRole] = useState(
    routeProps.role.slice(-5, routeProps.role.length) === 'ninja'
      ? 'ninja'
      : 'monster'
  )
  const [routeRole, setRouteRole] = useState(routeProps.role)

  const [summaryPopup, setSummaryPopup] = useState(false)

  const navigate = useNavigate()

  const summaryTitle = 'monster won'
  // TODO: Make it change based on whats selected
  const summaryCharacter = require('../assets/static/bosses/draco.png')
  const elo = 30
  const eloDiff = 2

  const [live, setLive] = useState(true);
  const [won, setWon] = useState(false);

  const [mode, setMode] = useState('move')
  const [loaded, setLoaded] = useState(false)
  const [POV, setPOV] = useState({})
  const [timer, setTimer] = useState(5)
  const modeRef = useRef(mode)
  const timerRef = useRef(timer)
  const liveRef = useRef(live);

  //TODO: Set hearts based on role
  const [hearts, setHearts] = useState(role === 'ninja' ? 3 : 5)

  useEffect(() => {
    timerRef.current = timer
  }, [timer])

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  useEffect (() => {
    liveRef.current = live
  }, [live]);

  useEffect(() => {
    setInterval(() => {
      if (
        timerRef.current === 0 &&
        modeRef.current !== 'wait' &&
        modeRef.current !== 'dead' &&
        modeRef.current !== 'monster won' &&
        modeRef.current !== 'ninjas won'
      ) {
        setTimer(5)
        if (modeRef.current === 'move') {
          setMode('action')
          document.getElementById('move1').style.visibility = 'visible'
          document.getElementById('move2').style.visibility = 'visible'
        } else if (
          modeRef.current === 'action' ||
          modeRef.current === 'direction-S' ||
          modeRef.current === 'direction-E' ||
          modeRef.current === 'direction'
        ) {
          setMode('wait')
          setTimer(0)
          //socket time
          document.getElementById("move1").style.visibility = "hidden";
          document.getElementById("move2").style.visibility = "hidden";

          client.send(JSON.stringify({
            type: "update",
            matchId: matchID,
            name: getUsername() 
          }));
        } 
      } else if (timerRef.current > 0) {
        setTimer(timerRef.current - 1)
      }
    }, 1000)
  }, [])

  let grid = {}

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  if (!loaded) {
      client.send(JSON.stringify({
        type: "create",
        matchId: matchID,
        name: getUsername() 
      }));
    
    if (role === "ninja") {
      getNinjas(matchID).then((ninjas) => {

        ninjas.forEach((ninja) => {
  
          if (ninja.displayName === getUsername()) {
            if (ninja.health === 0) {
              setLive(false);
            }
            newPOV(matchID, ninja.x, ninja.y, 3).then((hexes) => {

              hexes.forEach((hex) => {
                grid[hex['newCor']] = hex
              })
              setPOV(grid)
              setLoaded(true)
              setHearts(ninja.health)
              setX(ninja.x)
              setY(ninja.y)
            })
          }
        })

        if (!liveRef.current) {
          setMode('monster won')
          setTimer(0)
        } else {
          ninjas.forEach((ninja) => {
            if (ninja.displayName === getUsername()) {
              if (ninja.health === 0) {
                setMode('dead')
                setTimer(0)
              }
            }
          })
        }
      })
    } else {
      getMonsters(matchID).then((monsters) => {
        monsters.forEach((monster) => {
          if (monster.displayName === getUsername()) {
            newPOV(matchID, monster.x, monster.y, 3).then((hexes) => {
              hexes.forEach((hex) => {
                grid[hex['newCor']] = hex
              })
              setPOV(grid)
              setLoaded(true)
              setHearts(monster.health)
              setX(monster.x)
              setY(monster.y)

              if (monster.health === 0) {
                setMode('ninjas won')
                setTimer(0)
              }
            })
          }
        })
      })
    }
}
  
  return <div className = "gamescreen">
      <Overlay role={role} mode={mode} timer={timer} setMode={setMode} setTimer={setTimer} hearts={hearts}/>
      <Character role={routeRole}/>
      {loaded && <HexagonGrid matchID={matchID} role={role} POV={POV} mode={mode} setMode={setMode} setTimer={setTimer} x={x} y={y} setHearts={setHearts} hearts={hearts} setLive={setLive}/>}
      {!liveRef.current  && <ConfirmationPopup confirmAction={() => navigate("/lobby")} confirmText={"lobby"} cancelText={"spectate"}
                        title={
                          <div className={"summary-title"}>
                            {summaryTitle}
                          </div>
                        }
                        cancelAction={() => console.log("SPECTATE")}
                        modalStyle={{height:"400px", width:"400px", marginTop:"-200px", marginLeft:"-200px"}}
                        backgroundStyle={{zIndex:999}}
                        body={
                          <div className={"summary-body"}>
                            <img className={"summary-character"} src={summaryCharacter}
                                  alt={"summary-character"}/>
                            <div className={"summary-elo-container"}>
                              <div className={"summary-elo"}>
                                elo: {elo}
                              </div>
                              {won ?
                              <>
                                  <img src={require("../assets/static/icons/triangle-right-icon.png")} className={"summary-arrow up"}/>
                                  <div className={"summary-elo-diff green"}>
                                    {eloDiff}
                                  </div>
                              </>:<>
                                  <img src={require("../assets/static/icons/triangle-right-icon.png")} className={"summary-arrow down"}/>
                                  <div className={"summary-elo-diff red"}>
                                    {eloDiff}
                                  </div>
                                </>
                              }
                            </div>
                          </div>
                        }
       />}
  </div>
}

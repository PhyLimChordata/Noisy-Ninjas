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

import { Hexagon } from '../components/hexagon/Hexagon'

import { Peer } from "peerjs";


export function GameScreen() {
  const routeProps = useLocation().state;
  const matchID = routeProps.matchID;

  const [role, setRole] = useState(
    routeProps.role.slice(-5, routeProps.role.length) === 'ninja'
      ? 'ninja'
      : 'monster'
  )
  const [routeRole, setRouteRole] = useState(routeProps.role)


  const navigate = useNavigate()

  const ninja = {
    "black-ninja": require('../assets/static/lobby/ninjas/black-ninja.png'),
    "red-ninja": require('../assets/static/lobby/ninjas/red-ninja.png'),
    "blue-ninja": require('../assets/static/lobby/ninjas/blue-ninja.png'),
    "green-ninja": require('../assets/static/lobby/ninjas/green-ninja.png'),
    "pink-ninja": require('../assets/static/lobby/ninjas/pink-ninja.png'),
  }

  const monster = {
    draco: require('../assets/static/bosses/draco.png'),
    screamer: require('../assets/static/bosses/screamer.png'),
    tiny: require('../assets/static/bosses/tiny.png'),
  }

  const [summaryCharacter, setSummaryCharacter] = useState(role === 'ninja' ? ninja[routeRole] : monster[routeRole]);
  const [elo, setElo] = useState(0);
  const [live, setLive] = useState(true);
  const [won, setWon] = useState(false);
  const [summaryTitle, setSummaryTitle] = useState("monster won");

  const [mode, setMode] = useState('move')
  const [loaded, setLoaded] = useState(false)
  const [POV, setPOV] = useState({})
  const [timer, setTimer] = useState(5)
  const modeRef = useRef(mode)
  const timerRef = useRef(timer)
  const liveRef = useRef(live);

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
        modeRef.current !== 'win' &&
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


  const [peerID, setPeerID] = useState(null);
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteAudioRef = useRef(null);
  const peerInstance = useRef(null);

  //https://www.youtube.com/watch?v=5JTpRCo0e8s
  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerID(id)
    });

    peer.on('proxChat', (chat) => {
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      getUserMedia({ audio: true }, (remoteAudio) => {
        chat.answer(remoteAudio)
        chat.on('stream', function(remoteStream) {
          remoteAudioRef.current.srcObject = remoteStream
          remoteAudioRef.current.play();
        });
      });
    })

    peerInstance.current = peer;

  }, [])

    // proxChat(remotePeerIdValue)

  const proxChat = (remotePeerId) => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    getUserMedia({ audio: true }, (remoteAudio) => {

      const chat = peerInstance.current.proxChat(remotePeerId, remoteAudio)

      chat.on('stream', (remoteStream) => {
        remoteAudioRef.current.srcObject = remoteStream
        remoteAudioRef.current.play();
      });
    });
  }
  


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
      <video className ="proxchat" ref={remoteAudioRef} />
      <Overlay role={role} mode={mode} timer={timer} setMode={setMode} setTimer={setTimer} hearts={hearts}/>
      <Character role={routeRole}/>
      {loaded && <HexagonGrid matchID={matchID} routeRole={routeRole} role={role} POV={POV} mode={mode} setMode={setMode} setTimer={setTimer} x={x} y={y} setHearts={setHearts} hearts={hearts} setLive={setLive} setElo={setElo} setWon={setWon} setSummaryTitle={setSummaryTitle} proxChat={proxChat}/>}
      {!live  && <ConfirmationPopup confirmAction={() => navigate("/lobby")} confirmText={"lobby"} cancelText={"spectate"}
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
                                    5
                                  </div>
                              </>:<>
                                  <img src={require("../assets/static/icons/triangle-right-icon.png")} className={"summary-arrow down"}/>
                                  <div className={"summary-elo-diff red"}>
                                    3
                                  </div>
                                </>
                              }
                            </div>
                          </div>
                        }
       />}
  </div>
}

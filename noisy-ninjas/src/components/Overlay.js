import React, { useState } from 'react'
import '../style/overlay.css'

import { Hearts } from './Heart'

export function Overlay(props) {
  const {role, timer, mode, setMode, setTimer, hearts} = props

  let finishAction = (action) => {
    console.log(action);
    setMode(action)
    document.getElementById("move1").style.visibility = "hidden";
    document.getElementById("move2").style.visibility = "hidden";
    document.getElementById("move3").style.visibility = "hidden";
    document.getElementById("move4").style.visibility = "hidden";

    console.log("FROM OVERLAY: " + mode);
    setTimer(5);
  }
  
  return <div className="overlay">
    <div id= "move1" className="move" onClick={() => finishAction("direction-S")}><p>{role == "ninja" ? "Shuriken" : "Echo"}</p></div>
    <div id="move2" className="move" onClick={() => finishAction("direction-E")}><p>{role == "ninja" ? "Bomb" : "Scream"}</p></div>
    {/* <div id="move3" className="move" onClick={() => finishAction("direction")}><p>Item</p></div>
    <div id="move4" className="move" onClick={() => finishAction("direction")}><p>Etc</p></div> */}
    <div id="timer">{timer}</div>
    <div id="action">{mode}</div>
    <Hearts id="hearts" amount={hearts}/>
  </div>
}

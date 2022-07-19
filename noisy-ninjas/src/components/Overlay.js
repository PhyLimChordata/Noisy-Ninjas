import React, { useState } from 'react'
import '../style/overlay.css'

import { Hearts } from './Heart'

export function Overlay(props) {
  const {timer, mode, setMode, setTimer} = props

  let finishAction = (action) => {
    setMode(action)
    document.getElementById("move1").style.visibility = "hidden";
    document.getElementById("move2").style.visibility = "hidden";
    document.getElementById("move3").style.visibility = "hidden";
    document.getElementById("move4").style.visibility = "hidden";

    setTimer(5);
  }
  
  return <div className="overlay">
    <div id= "move1" className="move" onClick={() => finishAction("direction-S")}><p>Shuriken</p></div>
    <div id="move2" className="move" onClick={() => finishAction("direction-E")}><p>Decoy</p></div>
    <div id="move3" className="move" onClick={() => finishAction("direction")}><p>Item</p></div>
    <div id="move4" className="move" onClick={() => finishAction("direction")}><p>Etc</p></div>
    <div id="timer">{timer}</div>
    <div id="action">{mode}</div>
    <Hearts id="hearts" amount={3}/>
  </div>
}
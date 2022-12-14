import React  from 'react'
import '../style/Overlay.css'

import { Hearts } from './Heart'

export function Overlay(props) {
  const { role, timer, mode, setMode, setTimer, hearts } = props

  let finishAction = (action) => {
    if (mode !== 'dead') {
      setTimer(5)

      setMode(action)
      document.getElementById('move1').style.visibility = 'hidden'
      document.getElementById('move2').style.visibility = 'hidden'
    }
  }

  return (
    <div className="overlay">
      <div
        id="move1"
        className="move"
        onClick={() => finishAction('direction-S')}
      >
        <p>{role === 'ninja' ? 'Shuriken' : 'Echo'}</p>
      </div>
      <div
        id="move2"
        className="move"
        onClick={() => finishAction('direction-E')}
      >
        <p>{role === 'ninja' ? 'Bomb' : 'Scream'}</p>
      </div>
      <div id="timer">{timer}</div>
      <div id="action">{mode}</div>
      <Hearts id="hearts" amount={hearts} />
    </div>
  )
}

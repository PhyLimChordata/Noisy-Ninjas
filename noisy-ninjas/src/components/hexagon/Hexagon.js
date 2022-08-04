import React from 'react'
import '../../style/hexagon.css'
import '../../style/character.css'

import { monsters } from '../../assets/mappings/monster-mapping'
import { ninjaRange, ninjas } from '../../assets/mappings/ninja-mapping'

export function Hexagon(props) {
  const { info, id, onClick, mode, hover, unhover } = props
  const { backgroundColor, color, x, y, type, players, skin } = info

  // Shows off some image in a Hexagon
  function getClassName() {
    // Shows off skin in Hexagon if provided
    if (skin) {
      return skin
    }

    let isMonster = monsters.includes(players[0].skin)
    let isNinja = ninjas.includes(players[0].skin)
    let playerExists = players && players[0]
    let uniqueHex = type && type[0]

    // Shows off user/element in Hexagon in game
    if (playerExists && isMonster) {
      return "in-game-" + players[0].skin;
    } else if (playerExists && isNinja) {
      return "in-game-" + players[0].skin;
    }
    return uniqueHex || ''
  }

  // Each hex has a unique id based on the current game's mode
  // The colour of the hex and its border can be coloured with any hex code provided as
  // color and background color respectively
  return (
    <div
      id={'hex' + id}
      className={mode === 'move' ? 'hexagon-move' : 'hexagon'}
      onClick={() => onClick(x, y, id, info)}
      onMouseEnter={
        hover
          ? () => {
              hover(id, ninjaRange)
            }
          : () => {}
      }
      onMouseLeave={unhover ? () => {
        unhover(id, ninjaRange)} : () => {}
      }
      style={backgroundColor ? {backgroundColor: backgroundColor} : {}}
    >
      <div className="background-hex">
        <div className="content-hex" style={{ backgroundColor: color }}>
          <div className={getClassName()}></div>
        </div>
      </div>
    </div>
  )
}

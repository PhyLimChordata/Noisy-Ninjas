import React from 'react'
import '../../style/hexagon.css'
import '../../style/character.css'

export function Hexagon(props) {
  const { info, id, onClick, mode, hover, unhover } = props
  const { backgroundColor, color, x, y, type, players, skin } = info
  function getClassName() {
    if (skin) {
      return skin
    }
    //TODO: export the array

    //Monsters will have priority in being seen
    if (players && players[0] && ["draco", "screamer", "tiny"].includes(players[0].skin)) {
      return "in-game-" + players[0].skin;
    } else if (players && players[0] &&  ["black-ninja", "pink-ninja", "red-ninja", "blue-ninja", "green-ninja"].includes(players[0].skin)) {
      return "in-game-" + players[0].skin;
    }
    return (type && type[0]) || ''
  }
  return (
    <div
      id={'hex' + id}
      className={mode === 'move' ? 'hexagon-move' : 'hexagon'}
      onClick={() => onClick(x, y, id, info)}
      onMouseEnter={
        hover
          ? () => {
              hover(id, 3)
            }
          : () => {}
      }
      onMouseLeave={unhover ? () => {
        unhover(id, 3)} : () => {}
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

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
    if (players && players[0] == 'x') {
      return 'ninjas'
    } else if (players && players[0] == 'y') {
      return 'monster'
    }
    return (type && type[0]) || ''
  }
  if (x == 18 && y == 17) {
    console.log(info)
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

import React from 'react'
import '../../style/hexagon.css'

export function Hexagon(props) {
  const {info, id, onClick, mode, hover, unhover} = props
  const {color, x, y, type, players} = info
  function getClassName() {
    // if (players && players[0]) {
    //   console.log(players)
    // }
    if (players && players[0] == "ChoIsBest") {
      return "ninjas"
    } else if (players && players[0] == "Cho'sMenace") {
      return "monster"
    }
    return type && type[0] || ""
  }

  return <div id={"hex" + id} className={mode === "move" ? "hexagon-move" : "hexagon"} onClick={() => onClick(x, y, id, info)} onMouseEnter={hover ? () => hover(id, 3) : ()=>{}} onMouseLeave={unhover ? ()=>unhover(id, 3) : ()=>{}}>
    <div className="background-hex">
      <div className="content-hex" style={{backgroundColor: color}}>
        <div className={getClassName()}></div>
      </div>
    </div>
  </div>
}

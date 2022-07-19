import React from 'react'
import '../../style/hexagon.css'

export function Hexagon(props) {
  const {info, id, onClick, mode, hover, unhover} = props
  const {color, x, y} = info

  return <div id={"hex" + id} className={mode === "move" ? "hexagon-move" : "hexagon"} onClick={() => onClick(x, y, id)} onMouseEnter={hover ? () => hover(id, 3) : ()=>{}} onMouseLeave={unhover ? ()=>unhover(id, 3) : ()=>{}}>
    <div className="background-hex">
      <div className="content-hex" style={{backgroundColor: color}}></div>
    </div>
  </div>
}

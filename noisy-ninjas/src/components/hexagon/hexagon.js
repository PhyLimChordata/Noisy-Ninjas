import React, {useState} from 'react'
import '../../style/hexagon.css'

export function Hexagon(props) {
  return <div id={"hex" + props.id} className="clip">
    <div className="background-hex">
      <div className="content-hex"></div>
    </div>
  </div>
}
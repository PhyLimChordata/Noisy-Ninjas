import React from 'react'
import '../../style/hexagon.css'

export function DynamicHexagon(props) {
  return <div id={"hex" + props.id} className="clip">
  </div>
}
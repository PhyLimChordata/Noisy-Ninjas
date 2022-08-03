import React from 'react'
import '../style/Overlay.css'

export function Hearts(props) {
  return (
    <div id={props.id} className="hearts">
      {[...Array(props.amount)].map((_, index) => (
        <div key={index} className="live-heart" />
      ))}
    </div>
  )
}

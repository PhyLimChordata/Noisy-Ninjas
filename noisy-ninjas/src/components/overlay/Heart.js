import React, { useState } from 'react'
import '../../style/overlay.css'

export function Hearts(props) {
  return <div id={props.id} className="hearts">
    {[...Array(props.amount)].map(()=>(
       <div className="live-heart">
       </div>
    ))}
  </div>
}
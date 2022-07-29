import React from 'react'
import '../style/character.css'

export function Character(props) {
  return (
    <div className="container">
      <div className={props.role} />
    </div>
  )
}

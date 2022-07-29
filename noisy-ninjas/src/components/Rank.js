import React from 'react'
import '../style/Rank.css'

export function Rank(props) {
  const { rank, name, className = '', onPress } = props
  return (
    <div className={`rank-component ${className} clickable`} onClick={onPress}>
      <div className={'rank-number'}> {rank} </div>
      <img
        className={'ninja-img'}
        src={require('../assets/static/icons/profile-pic-icon.png')}
        alt={'profile-pic'}
      />
      <div className={'username'}> {name} </div>
    </div>
  )
}

import React from 'react'
import '../../style/hexagon.css'
import { Hexagon } from './hexagon'

export function BossHexagonGrid(props) {

  return <div className="container">
    <div className="hex3row">
      <Hexagon></Hexagon>
      <Hexagon></Hexagon>
      <Hexagon></Hexagon>
    </div>
    <div className="hex4row">
      <Hexagon></Hexagon>
      <Hexagon></Hexagon>
      <Hexagon></Hexagon>
      <Hexagon></Hexagon>
    </div>
    <div className="hex5row">
      <Hexagon></Hexagon>
      <Hexagon></Hexagon>
      <Hexagon></Hexagon>
      <Hexagon></Hexagon>
      <Hexagon></Hexagon>
    </div>
    <div className="hex4row">
      <Hexagon></Hexagon>
      <Hexagon></Hexagon>
      <Hexagon></Hexagon>
      <Hexagon></Hexagon>
    </div>
    <div className="hex3row">
      <Hexagon></Hexagon>
      <Hexagon></Hexagon>
      <Hexagon></Hexagon>
    </div>
  </div>
}
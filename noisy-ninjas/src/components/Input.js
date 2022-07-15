import React from 'react'
import '../style/Input.css'
export function Input(props) {
    const {onPress, placeholder=" ", onChange, type = "text", className= "", style} = props
    return <input className={className} type={type} style={{...style}} onClick={onPress} placeholder={placeholder} onChange={onChange}/>}

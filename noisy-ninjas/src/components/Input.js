import React from 'react'
import {Black, White} from "../assets/colors";
import '../style/Input.css'
export function Input(props) {
    const {backgroundColor = Black, fontColor = White, width, height, onPress, fontSize = 18, padding = 8, borderColor = White, placeholder=" ", onChange, type = "text"} = props
    return <input type={type} style={{backgroundColor, color: fontColor, width, height, fontSize, padding, borderColor, }} onClick={onPress} placeholder={placeholder} onChange={onChange}/>}

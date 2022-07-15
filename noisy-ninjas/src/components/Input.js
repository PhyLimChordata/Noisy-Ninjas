import React from 'react'
import {Black, White} from "../assets/colors";
import '../style/Input.css'
export function Input(props) {
    const {backgroundColor = Black, fontColor = White, width, height, onPress, fontSize = 18, padding = 8, borderColor = White, placeholder=" "} = props
    return <input type={"text"} style={{backgroundColor, color: fontColor, width, height, fontSize, padding, borderColor, }} onClick={onPress} placeholder={placeholder}/>}

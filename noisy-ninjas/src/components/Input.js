import React from 'react'
import {Black, White} from "../assets/colors";
import '../style/Input.css'
export function Input(props) {
    const {backgroundColor = Black, fontColor = White, width = "100%", height = "100%", onPress, fontSize = 18, padding = 8, borderColor = White} = props
    return <input style={{backgroundColor, color: fontColor, width, height, fontSize, padding, borderColor, }} onClick={onPress} placeholder={"NAME"}/>}

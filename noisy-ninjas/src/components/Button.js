import React from 'react'
import {LightGray, White} from "../assets/colors";
import "../style/Button.css"

export function Button(props) {
    const {backgroundColor = LightGray, fontColor = White, width, height, onPress, content, fontSize = 24, padding = 8, borderRadius = 10, borderColor = LightGray, disabled = false} = props
    return <button className={"btn"} disabled={disabled} style={{backgroundColor, color: fontColor, width, height, fontSize, padding, borderRadius, border: `1px solid ${borderColor}`, marginBottom:'20px'}} onClick={onPress}> {content} </button>
}

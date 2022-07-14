import React from 'react'
import {LightGray, White} from "../assets/colors";

export function Button(props) {
    const {backgroundColor = LightGray, fontColor = White, width = "100%", height = "100%", onPress, content, fontSize = 18, padding = 8, borderRadius = 10, borderColor = LightGray, disabled = false} = props
    return <button disabled={disabled} style={{backgroundColor, color: fontColor, width, height, fontSize, padding, borderRadius, border: `1px solid ${borderColor}`, marginBottom:'20px'}} onClick={onPress}> {content} </button>
}

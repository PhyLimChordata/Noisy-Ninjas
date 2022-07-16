import React from 'react'
import "../style/Button.css"

export function Button(props) {
    const {onPress, content, disabled = false, className= "", style} = props
    return <button className={`btn ${className}`} disabled={disabled} style={{...style}} onClick={onPress}> {content} </button>
}

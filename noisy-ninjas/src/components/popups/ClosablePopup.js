import React from 'react'
import '../../style/Popup.css'
import {Popup} from "./Popup";
export function ClosablePopup(props) {
    const {closeAction, body, title, modalStyle} = props
    const header = <div className="close-modal clickable" onClick={() => closeAction()}>&times;</div>

    return <Popup body={body} title={title} header={header} modalStyle={modalStyle}/>
    }

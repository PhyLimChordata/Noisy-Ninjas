import React from 'react'
import { getUsername } from '../../apiService';
import '../../style/Popup.css'
import {Popup} from "./Popup";
export function ClosablePopup(props) {
    const {client, closeAction, body, title, modalStyle, backgroundStyle} = props
    const header = <div className="close-modal clickable" onClick={() => {
        closeAction();
        client.send(JSON.stringify({type: "leave", matchId: "ok", name: getUsername()}));
    }}>&times;</div>

    return <Popup body={body} title={title} header={header} modalStyle={modalStyle} backgroundStyle={backgroundStyle}/>
    }
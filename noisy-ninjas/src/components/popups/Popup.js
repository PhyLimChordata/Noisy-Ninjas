import React from 'react'
import '../../style/Popup.css'
export function Popup(props) {
    const {body, title, footer, header, modalStyle} = props
    return (
        <div className="modal-component">
            <div className="modal_content" style={{...modalStyle}}>
                {header}
                <div className={"title"}>{title}</div>
                <div className={"body-content"}>{body}</div>
                <div className={"footer-content"}>{footer}</div>
            </div>
        </div>
    )}

import React from 'react'
import '../../style/Popup.css'
import { Button } from '../Button'
import { Popup } from './Popup'
export function ConfirmationPopup(props) {
  const {
    confirmText,
    cancelText = 'cancel',
    body,
    title,
    confirmAction,
    cancelAction,
    modalStyle,
    backgroundStyle,
  } = props
  const footer = (
    <div className={'confirmation-footer'}>
      <Button
        content={confirmText}
        className={'hollow-btn skinny'}
        onPress={() => confirmAction()}
      ></Button>
      <Button
        content={cancelText}
        className={'hollow-btn skinny'}
        onPress={() => cancelAction()}
      ></Button>
    </div>
  )
  const bodyContent = <div className={'confirmation-body'}>{body}</div>
  const titleContent = <div className={'confirmation-title'}>{title}</div>
  return (
    <Popup
      footer={footer}
      body={bodyContent}
      title={titleContent}
      modalStyle={modalStyle}
      backgroundStyle={backgroundStyle}
    />
  )
}

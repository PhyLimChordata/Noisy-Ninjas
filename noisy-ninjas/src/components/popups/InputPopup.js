import React from 'react'
import '../../style/Popup.css'
import { Button } from '../Button'
import { Popup } from './Popup'
export function InputPopup(props) {
  const {
    confirmText,
    cancelText = 'cancel',
    body,
    title,
    confirmAction,
    cancelAction,
    modalStyle,
  } = props
  const footer = (
    <div className={'input-footer'}>
      <Button
        content={confirmText}
        form={'input-popup-form'}
        type={'submit'}
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

  const bodyContent = (
    <form
      className={'input-body'}
      id={'input-popup-form'}
      onSubmit={() => confirmAction()}
    >
      {body}
    </form>
  )
  const titleContent = <div className={'input-title'}>{title}</div>
  return (
    <Popup
      footer={footer}
      body={bodyContent}
      title={titleContent}
      modalStyle={modalStyle}
    />
  )
}

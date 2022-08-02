import React, { useEffect, useState } from 'react'
import '../style/Account.css'
import { Button } from '../components/Button'
import { ConfirmationPopup } from '../components/popups/ConfirmationPopup'
import { useLocation, useNavigate } from 'react-router'
import {
  changePassword,
  changeUsername,
  deleteAccount,
  getUser,
  getUsername,
  getUserStats,
} from '../apiService'
import { Input } from '../components/Input'
import { InputPopup } from '../components/popups/InputPopup'
import { Hexagon } from '../components/hexagon/Hexagon'

import {White} from '../assets/colors';

export function Account() {
  const { state } = useLocation()
  const { username, skin } = state // Read values passed on state
  const [deleteAccountPopup, setDeleteAccountPopup] = useState(false)
  const [changePasswordPopup, setChangePasswordPopup] = useState(false)
  const [changeUsernamePopup, setChangeUsernamePopup] = useState(false)
  const [beltRank, setBeltRank] = useState(White);

  const [userStats, setUserStats] = useState({
    points: '?',
    gamesPlayed: '?',
    gamesWon: '?',
      beltRank: White,
  })

  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPassword2, setNewPassword2] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const tooltipBody = (
    <div className={'tooltip-list-container'}>
      Password must have
      <li>At least 8 characters</li>
      <li>Both uppercase and lowercase</li>
      <li>Both a number and letter</li>
    </div>
  )
  const ownsProfile = username === getUsername()

  const navigate = useNavigate()
  useEffect(() => {
    getUserStats(username).then((res) => {
      setUserStats(res)
    })

    getUser(username).then((user) => {

        setBeltRank(user.beltRank);
      });
  }, []);




  const { gamesWon, gamesPlayed, points } = userStats

  const changePasswordBody = (
    <div>
      <Input
        className={'form-element black-input'}
        placeholder={'new password'}
        value={newPassword}
        type={'password'}
        onChange={(e) => {
          setNewPassword(e.target.value)
          if (errorMessage) {
            setErrorMessage(null)
          }
        }}
        icon={require('../assets/static/icons/question-icon.png')}
        tooltipBody={tooltipBody}
        tooltipId={'password'}
      />
      <Input
        className={'form-element black-input'}
        placeholder={'renter new password'}
        value={newPassword2}
        type={'password'}
        onChange={(e) => {
          setNewPassword2(e.target.value)
          if (errorMessage) {
            setErrorMessage(null)
          }
        }}
      />
      {errorMessage && <div className={'error-text'}>{errorMessage}</div>}
    </div>
  )

  function submitPasswordChange() {
    if (!isValidPassword(newPassword)) {
      setErrorMessage('Password does not meet requirements')
    } else if (newPassword !== newPassword2) {
      setErrorMessage('Passwords do not match')
    } else {
      changePassword(newPassword)
        .then(() => {
          toggleChangePasswordPopup()
          alert('Password was changed')
          setErrorMessage(null)
        })
        .catch((err) => {
          const res = err.response
          setErrorMessage(res.data)
        })
    }
  }
  // Checks longer than 7 characters, has numbers and letters, and has capitals and lowercase
  function isValidPassword(password) {
    return (
      password.length > 7 && /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)
    )
  }

  function submitUsernameChange() {
    changeUsername(newUsername)
      .then(() => {
        toggleChangeUsernamePopup()
        alert('Username was changed')
          setErrorMessage(null)
          navigate('/lobby')
          navigate(0)
      })
      .catch((err) => {
        const res = err.response
        if (res.status === 409) {
          setErrorMessage('Username already in use')
        } else {
          setErrorMessage(res.data)
        }
      })
  }

  const changeUsernameBody = (
    <div>
      <Input
        className={'form-element black-input'}
        placeholder={'new username'}
        value={newUsername}
        onChange={(e) => {
          setNewUsername(e.target.value)
          if (errorMessage) {
            setErrorMessage(null)
          }
        }}
      />
      {errorMessage && <div className={'error-text'}>{errorMessage}</div>}
    </div>
  )

  function toggleDeleteAccountPopup() {
    setDeleteAccountPopup(!deleteAccountPopup)
  }
  function toggleChangePasswordPopup() {
    setChangePasswordPopup(!changePasswordPopup)
  }

  function toggleChangeUsernamePopup() {
    setChangeUsernamePopup(!changeUsernamePopup)
  }

  return (
    <div className={'account-page'}>
      <div className={'header'}>
        <img
          className={'back-icon clickable'}
          onClick={() => navigate(-1)}
          src={require('../assets/static/icons/back-icon.png')}
          alt={'back-icon'}
        />
      </div>
      <div className={'body'}>
        {/* TODO: Change div */}
        <div className={'ninja-select'}>
          <div style={{ height: '17vw', width: '17vw' }}>
            <Hexagon
              id={'-profile'}
              info={{backgroundColor: userStats.beltRank, color: White, skin: "black-ninja" }}
            ></Hexagon>
          </div>
          {/* <img className={"ninja-img"} src={require("../assets/static/icons/profile-pic-icon.png")} alt={"current-ninja"}/> */}
        </div>
        <div className={'button-container'}>
          <div className={'button-inner-container'}>
            <div className={'end'}>
              <div className={'username'}> {username}</div>
              {ownsProfile && (
                <img
                  style={{ height: '30px' }}
                  className={'clickable'}
                  onClick={() => toggleChangeUsernamePopup()}
                  src={require('../assets/static/icons/edit-icon.png')}
                  alt={'monster-draco'}
                />
              )}
            </div>
            <div className={'stats-container'}>
              <div className={'stats'}>elo: {points}</div>
              <div className={'stats'}>wins: {gamesWon}</div>
              <div className={'stats'}>games played: {gamesPlayed}</div>
            </div>
            {ownsProfile && (
              <Button
                content={'change password'}
                className={'hollow-btn skinny'}
                onPress={() => toggleChangePasswordPopup()}
              ></Button>
            )}
            {ownsProfile && (
              <Button
                content={'delete account'}
                className={'hollow-btn skinny'}
                onPress={() => toggleDeleteAccountPopup()}
              ></Button>
            )}
          </div>
        </div>
      </div>
      {deleteAccountPopup && (
        <ConfirmationPopup
          cancelAction={() => toggleDeleteAccountPopup()}
          confirmText={'delete account'}
          title={'delete account'}
          body={'are you sure you want to delete your account?'}
          confirmAction={() => {
            deleteAccount().then(() => {
              navigate('/')
              navigate(0)
            })
          }}
        />
      )}

      {changePasswordPopup && (
        <InputPopup
          confirmText={'change password'}
          title={'change password'}
          body={changePasswordBody}
          confirmAction={() => submitPasswordChange()}
          cancelAction={() => {
            toggleChangePasswordPopup()
            setErrorMessage(null)
          }}
        />
      )}

      {changeUsernamePopup && (
        <InputPopup
          confirmText={'change username'}
          title={'change username'}
          body={changeUsernameBody}
          confirmAction={() => submitUsernameChange()}
          cancelAction={() => {
            toggleChangeUsernamePopup()
            setErrorMessage(null)
          }}
        />
      )}
    </div>
  )
}

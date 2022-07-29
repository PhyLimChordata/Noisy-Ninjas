import React, { useState } from 'react'
import { Input } from '../components/Input'
import '../style/Auth.css'
import { Button } from '../components/Button'
import { googleLogin, signUp } from '../apiService'
import { useNavigate } from 'react-router'
export function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordError2, setPasswordError2] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  function handleSubmit(event) {
    event.preventDefault()
    let errored = false
    if (username === '') {
      setUsernameError(true)
      setErrorMessage('Missing Fields')
      errored = true
    }
    if (password === '') {
      setPasswordError(true)
      setErrorMessage('Missing Fields')
      errored = true
    }
    if (!errorMessage && !isValidPassword(password)) {
      setPasswordError(true)
      setErrorMessage('Password does not meet requirements')
      errored = true
    } else if (!errorMessage && password !== password2) {
      setPasswordError(true)
      setPasswordError2(true)
      setErrorMessage('Passwords dont match')
      errored = true
    }
    if (!errored) {
      signUp(username, password)
        .then(() => {
          navigate('/')
        })
        .catch((err) => {
          const res = err.response
          if (res.status === 409) {
            setErrorMessage('User already exists')
            setUsernameError(true)
          } else {
            setErrorMessage('An error occurred, try again')
          }
        })
    }
  }
  // Checks longer than 7 characters, has numbers and letters, and has capitals and lowercase
  function isValidPassword(password) {
    return (
      password.length > 7 && /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)
    )
  }

  const tooltipBody = (
    <div className={'tooltip-list-container'}>
      Password must have
      <li>At least 8 characters</li>
      <li>Both uppercase and lowercase</li>
      <li>Both a number and letter</li>
    </div>
  )
  return (
    <div className={'auth-page'}>
      <div id={'form-col'}>
        <div className={'title'}> Noisy Ninjas </div>
        <form className={'auth-form'} onSubmit={handleSubmit}>
          <div className={'input-container'}>
            {errorMessage && <div className={'error-text'}>{errorMessage}</div>}
            {usernameError ? (
              <Input
                className={'form-element error-input'}
                placeholder={'username'}
                value={username}
                onChange={(e) => {
                  setUsernameError(false)
                  setUsername(e.target.value)
                  setErrorMessage(null)
                }}
              />
            ) : (
              <Input
                className={'form-element black-input'}
                placeholder={'username'}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  if (errorMessage) {
                    setErrorMessage(null)
                  }
                }}
              />
            )}

            {passwordError ? (
              <Input
                className={'form-element error-input'}
                placeholder={'password'}
                value={password}
                onChange={(e) => {
                  setPasswordError(false)
                  setPasswordError2(false)
                  setPassword(e.target.value)
                  setErrorMessage(null)
                }}
                type={'password'}
                icon={require('../assets/static/question-icon.png')}
                tooltipBody={tooltipBody}
                tooltipId={'password'}
              />
            ) : (
              <Input
                className={'form-element black-input'}
                placeholder={'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errorMessage) {
                    setErrorMessage(null)
                  }
                }}
                type={'password'}
                icon={require('../assets/static/question-icon.png')}
                tooltipBody={tooltipBody}
                tooltipId={'password'}
              />
            )}
            {passwordError2 ? (
              <Input
                className={'form-element error-input'}
                placeholder={'reenter password'}
                value={password2}
                onChange={(e) => {
                  setPasswordError(false)
                  setPasswordError2(false)
                  setPassword2(e.target.value)
                  setErrorMessage(null)
                }}
                type={'password'}
              />
            ) : (
              <Input
                className={'form-element black-input'}
                placeholder={'reenter password'}
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value)
                  if (errorMessage) {
                    setErrorMessage(null)
                  }
                }}
                type={'password'}
              />
            )}
          </div>
          {username && password && password2 ? (
            <Button
              type="submit"
              content={'sign up'}
              className={'orange-btn'}
            ></Button>
          ) : (
            <Button
              type="submit"
              content={'sign up'}
              className={'grey-btn'}
            ></Button>
          )}
        </form>
        <div>
          <div className={'oauth-container'} title={'oauth-container'}>
            {/* TODO: LOCALHOST AND GET RID OF FACEBOOK */}
            <div
              className={'clickable oauth-btn'}
              onClick={() => googleLogin()}
            >
              <img
                className={'oauth-icon'}
                src={require('../assets/static/google-icon.png')}
                alt={'google-icon'}
              />
            </div>
            {/* <div className={"clickable oauth-btn"}>
                            <img className={"oauth-icon"} src={require("../assets/static/facebook-icon.png")} alt={"facebook-icon"}/>
                        </div> */}
          </div>
          <div className={'clickable'} onClick={() => navigate('/')}>
            Already have an account?
          </div>
        </div>
      </div>
      <div id={'img-col'}>
        <img
          className={'background-img'}
          src={require('../assets/static/sign-up-background.png')}
          alt={'sign-up-background'}
        />
      </div>
    </div>
  )
}

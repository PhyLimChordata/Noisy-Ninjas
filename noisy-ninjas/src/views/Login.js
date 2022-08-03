import React, { useState } from 'react'
import { Input } from '../components/Input'
import '../style/Auth.css'
import { Button } from '../components/Button'
import { googleLogin, login } from '../apiService'
import { useNavigate } from 'react-router'
export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
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
    if (!errored) {
      login(username, password)
        .then(() => {
          navigate('/lobby')
          navigate(0)
        })
        .catch((err) => {
          const res = err.response
          if (res.status === 401) {
            setErrorMessage('Invalid Login')
            setUsernameError(true)
            setPasswordError(true)
          } else {
            setErrorMessage('An error occurred, try again')
          }
        })
    }
  }
  return (
    <div className={'auth-page'}>
      <div id={'img-col'}>
        <img
          className={'background-img'}
          src={require('../assets/static/background/log-in-background.png')}
          alt={'log-in-background'}
        />
      </div>
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
                  if (!passwordError) {
                    setErrorMessage(null)
                  }
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
                  setPassword(e.target.value)
                  if (!usernameError) {
                    setErrorMessage(null)
                  }
                }}
                type={'password'}
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
              />
            )}
          </div>
          {username && password ? (
            <Button
              type="submit"
              content={'log in'}
              className={'orange-btn'}
            ></Button>
          ) : (
            <Button
              type="submit"
              content={'log in'}
              className={'grey-btn'}
            ></Button>
          )}
        </form>
        <div>
          <div className={'oauth-container'}>
            <div
              className={'clickable oauth-btn'}
              onClick={() => googleLogin()}
            >
              <img
                className={'oauth-icon'}
                src={require('../assets/static/icons/google-icon.png')}
                alt={'google-icon'}
              />
            </div>
            {/* <div className={"clickable oauth-btn"}>
                            <img className={"oauth-icon"} src={require("../assets/static/icons/facebook-icon.png")} alt={"facebook-icon"}/>
                        </div> */}
          </div>
          <div className={'clickable'} onClick={() => navigate('/sign-up')}>
            create account
          </div>
        </div>
      </div>
    </div>
  )
}

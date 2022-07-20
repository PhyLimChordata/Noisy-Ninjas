import React, {useState} from "react";
import {Input} from "../components/Input";
import "../style/Auth.css"
import {Button} from "../components/Button";
import {Checkbox} from "../components/Checkbox";
import {googleLogin, login} from "../apiService";
import {useNavigate} from "react-router";
export function Login ()  {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        let errored = false;
        if (username === "") {
            setUsernameError(true)
            setErrorMessage("Missing Fields")
            errored = true
        }
        if (password === "") {
            setPasswordError(true)
            setErrorMessage("Missing Fields")
            errored = true
        }
        if (!errored) {
            login(username, password).then(() => {
                navigate("/lobby")
                navigate(0)
            }).catch((err) => {
                const res = err.response
                if (res.status === 401) {
                    setErrorMessage("Invalid Login")
                    setUsernameError(true)
                    setPasswordError(true)
                } else {
                    setErrorMessage(res.data)
                }
            })
        }
    }
    return (
        <div className={"auth-page"}>
            <div id={"img-col"}>
                <img className={"background-img"} src={require("../assets/static/log-in-background.png")} alt={"log-in-background"}/>
            </div>
            <div id={"form-col"}>
                <div className={"title"}> Noisy Ninjas </div>
                <form className={"auth-form"} onSubmit={handleSubmit}>
                    <div className={"input-container"}>
                        {(errorMessage) && <div className={"error-text"}>{errorMessage}</div>}
                        {usernameError ?
                            <Input className={"form-element error-input"} placeholder={"username"} value={username}
                                   onChange={(e) => {
                                       setUsernameError(false)
                                       setUsername(e.target.value)
                                       if (!passwordError) {
                                           setErrorMessage(null)
                                       }
                                   }} />
                            :
                            <Input className={"form-element black-input"} placeholder={"username"} value={username}
                                   onChange={(e) => {
                                       setUsername(e.target.value)
                                       if (errorMessage) {
                                           setErrorMessage(null)
                                       }
                                   }} />
                        }

                        {passwordError ?
                            <Input className={"form-element error-input"} placeholder={"password"} value={password}
                                   onChange={(e) => {
                                       setPasswordError(false)
                                       setPassword(e.target.value)
                                       if (!usernameError) {
                                           setErrorMessage(null)
                                       }
                                   }} type={"password"}/>
                            :
                            <Input className={"form-element black-input"} placeholder={"password"} value={password}
                                   onChange={(e) => {
                                       setPassword(e.target.value)
                                       if (errorMessage) {
                                           setErrorMessage(null)
                                       }
                                   }} type={"password"}/>
                        }

                        <div className={"form-element start"}>
                            <Checkbox backgroundColor={"#222222"}/>
                            <label> stay signed in </label>
                        </div>
                    </div>

                    <Button type="submit" content={"log in"} className={"grey-btn"}></Button>
                </form>
                <div>
                    <div className={"oauth-container"}>
                        {/*TODO: CHANGE LOCALHOST:5000*/}
                        <div className={"clickable oauth-btn"} onClick={() => googleLogin()}>
                            <img className={"oauth-icon"} src={require("../assets/static/google-icon.png")} alt={"google-icon"}/>
                        </div>
                        <div className={"clickable oauth-btn"}>
                            <img className={"oauth-icon"} src={require("../assets/static/facebook-icon.png")} alt={"facebook-icon"}/>
                        </div>
                    </div>
                    <div className={"clickable disabled-text"} onClick={() => console.log('forgot pass?')}>
                        forgot password?
                    </div>
                    <div className={"clickable"} onClick={() => navigate("/sign-up")}>
                        create account
                    </div>
                </div>
            </div>
        </div>
    );
};

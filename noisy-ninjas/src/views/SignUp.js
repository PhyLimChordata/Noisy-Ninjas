import React, {useState} from "react";
import {Input} from "../components/Input";
import "../style/Auth.css"
import {Button} from "../components/Button";
export function SignUp ()  {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    function handleSubmit(event) {
        event.preventDefault();
        alert(`${username}, ${password}, ${password2}`)
    }

    return (
        <div id={"body-container"}>
            <div id={"form-col"}>
                <div className={"title"}> Noisy Ninjas </div>
                <form className={"auth-form"} onSubmit={handleSubmit}>
                    <div className={"input-container"}>
                        <Input className={"form-element black-input"} placeholder={"username"} value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                        <Input className={"form-element black-input"} placeholder={"password"} value={password}
                               onChange={(e) => setPassword(e.target.value)} type={"password"}/>
                        <Input className={"form-element black-input"} placeholder={"reenter password"} value={password2}
                               onChange={(e) => setPassword2(e.target.value)} type={"password"}/>
                    </div>
                    <Button type="submit" content={"sign up"} className={"grey-btn"}></Button>
                </form>
                <div>
                    <div className={"oauth-container"}>
                        <div className={"clickable oauth-btn"}>
                            <img className={"oauth-icon"} src={require("../assets/static/google-icon.png")}/>
                        </div>
                        <div className={"clickable oauth-btn"}>
                            <img className={"oauth-icon"} src={require("../assets/static/facebook-icon.png")}/>
                        </div>
                    </div>
                    <div className={"clickable"} onClick={() => console.log('Already have an account?')}>
                        Already have an account?
                    </div>
                </div>
            </div>
            <div id={"img-col"}>
                <img className={"background-img"} src={require("../assets/static/sign-up-background.png")}/>
            </div>
        </div>
    );
};

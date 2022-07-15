import React, {useState} from "react";
import {Input} from "../components/Input";
import "../style/Auth.css"
import {Button} from "../components/Button";
import {Checkbox} from "../components/Checkbox";
export function Login ()  {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    function handleSubmit(event) {
        event.preventDefault();
        alert(`${username}, ${password}`)
    }

    return (
        <div id={"body-container"}>
            <div id={"img-col"}>
                <img className={"background-img"} src={require("../assets/static/log-in-background.png")}/>
            </div>
            <div id={"form-col"}>
                <div className={"title"}> Noisy Ninjas </div>
                <form className={"auth-form"} onSubmit={handleSubmit}>
                    <div className={"input-container"}>
                        <Input className={"form-element black-input"} placeholder={"username"} value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                        <Input className={"form-element black-input"} placeholder={"password"} value={password}
                               onChange={(e) => setPassword(e.target.value)} type={"password"}/>
                        <div className={"form-element start"}>
                            <Checkbox backgroundColor={"#222222"}/>
                            <label> stay signed in </label>
                        </div>
                    </div>

                    <Button type="submit" content={"log in"} className={"grey-btn"}></Button>
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
                    <div className={"clickable"} onClick={() => console.log('forgot pass?')}>
                        forgot password?
                    </div>
                    <div className={"clickable"} onClick={() => console.log("create acc")}>
                        create account
                    </div>
                </div>
            </div>
        </div>
    );
};

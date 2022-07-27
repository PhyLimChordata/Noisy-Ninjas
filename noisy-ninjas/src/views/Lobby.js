import React, {useState} from "react";
import "../style/Lobby.css"
import {Button} from "../components/Button";
import {ConfirmationPopup} from "../components/popups/ConfirmationPopup";
import {QueuePopup} from "../components/popups/QueuePopup";
import {useNavigate} from "react-router";
import {getUsername, signOut} from "../apiService";
import {InputPopup} from "../components/popups/InputPopup";
export function Lobby ()  {
    const [signOutPopup, setSignOutPopup] = useState(false)
    const [lobbyPopup, setLobbyPopup] = useState(false)
    const navigate = useNavigate();
    const username = getUsername()
    function toggleSignOutPopup() {
        setSignOutPopup(!signOutPopup)
    }
    function toggleLobbyPopup() {
        setLobbyPopup(!lobbyPopup)
    }
    return (
        <div className={"lobby-page"}>
            <div className={"title"}> Welcome {username}</div>
            <div className={"body"}>
                <div className={"ninja-select"}>
                    <img className={"arrow-img left"} src={require("../assets/static/triangle-right.png")} alt={"left-arrow"}/>
                    <img className={"ninja-img"} src={require("../assets/static/ninja.png")} alt={"current-ninja"}/>
                    <img className={"arrow-img"} src={require("../assets/static/triangle-right.png")} alt={"right-arrow"}/>
                </div>
                <div className={"button-container"}>
                    <div className={"button-inner-container"}>
                        <Button content={"play"} className={"orange-btn skinny"} onPress={() => toggleLobbyPopup()}></Button>
                        <Button content={"profile"} className={"hollow-btn skinny"} onPress={() => navigate("/account")}></Button>
                        <Button content={"leaderboard"} className={"hollow-btn skinny"} onPress={() => navigate("/leaderboard")}></Button>
                        <Button content={"sign out"} className={"hollow-btn skinny"} onPress={() => toggleSignOutPopup()}></Button>
                    </div>
                </div>
            </div>
            {signOutPopup && <ConfirmationPopup cancelAction={() => toggleSignOutPopup()} confirmText={"sign out"}
                                                title={"sign out"} body={"are you sure you want to sign out?"} confirmAction={() => {
                                                    signOut().then(() => {
                                                        navigate("/")
                                                    })
            }}/>}

            {lobbyPopup && <QueuePopup closeAction={() => toggleLobbyPopup()} confirmText={"sign out"}
                                                title={"sign out"} body={"are you sure you want to sign out?"} confirmAction={() => console.log("signed out")}/>}

        </div>
    );
};

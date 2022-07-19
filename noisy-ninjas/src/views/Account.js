import React, {useState} from "react";
import "../style/Account.css"
import {Button} from "../components/Button";
import {ConfirmationPopup} from "../components/popups/ConfirmationPopup";
import {QueuePopup} from "../components/popups/QueuePopup";
import {useNavigate} from "react-router";
import {deleteAccount, getUsername} from "../apiService";
export function Account ()  {
    const [deleteAccountPopup, setDeleteAccountPopup] = useState(false)
    const [lobbyPopup, setLobbyPopup] = useState(false)
    const navigate = useNavigate();
    function getUserStats() {
        return  {wins: 64, gamesPlayed: 119}
    }
    const username = getUsername()
    const {wins, gamesPlayed} = getUserStats()
    function toggleDeleteAccountPopup() {
        setDeleteAccountPopup(!deleteAccountPopup)
    }
    function toggleLobbyPopup() {
        setLobbyPopup(!lobbyPopup)
    }

    return (
        <div className={"account-page"}>
            <div className={"header"}>
                <img className={"back-icon clickable"} onClick={()=> navigate(-1)} src={require("../assets/static/back-icon.png")} alt={"back-icon"}/>
            </div>
            <div className={"body"}>
                <div className={"ninja-select"}>
                    <img className={"ninja-img"} src={require("../assets/static/profile-pic.png")} alt={"current-ninja"}/>
                </div>
                <div className={"button-container"}>
                    <div className={"button-inner-container"}>
                        <div className={"end"}>
                            <div className={"username"}> {username}</div>
                            <img style={{height:"30px"}} className={"clickable"} src={require("../assets/static/edit-icon.png")} alt={"monster-drako"}/>
                        </div>
                        <div className={"stats-container"}>
                            <div className={"stats"}>wins: {wins}</div>
                            <div className={"stats"}>games played: {gamesPlayed}</div>
                        </div>
                        <Button content={"change password"} className={"hollow-btn skinny"}></Button>
                        <Button content={"delete account"} className={"hollow-btn skinny"} onPress={()=>  toggleDeleteAccountPopup()}></Button>
                    </div>
                </div>
            </div>
            {deleteAccountPopup && <ConfirmationPopup cancelAction={() => toggleDeleteAccountPopup()} confirmText={"delete account"}
                                                      title={"delete account"} body={"are you sure you want to delete your account?"} confirmAction={() => {
                deleteAccount().then(() => {
                    navigate("/")
                })
            }}/>}

            {lobbyPopup && <QueuePopup closeAction={() => toggleLobbyPopup()} confirmText={"sign out"}
                                       title={"sign out"} body={"are you sure you want to sign out?"} confirmAction={() => console.log("signed out")}/>}

        </div>
    );
};

import React, {useState} from "react";
import "../style/Account.css"
import {Button} from "../components/Button";
import {ConfirmationPopup} from "../components/popups/ConfirmationPopup";
import {QueuePopup} from "../components/popups/QueuePopup";
import {useNavigate} from "react-router";
export function Account ()  {
    const [deleteAccountPopup, setDeleteAccountPopup] = useState(false)
    const [lobbyPopup, setLobbyPopup] = useState(false)
    const navigate = useNavigate();

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
                            <div className={"username"}> KingSlayer69420</div>
                            <img style={{height:"30px", flex:1}} className={"clickable"} src={require("../assets/static/edit-icon.png")} alt={"monster-drako"}/>
                        </div>
                        <div className={"stats-container"}>
                            <div className={"stats"}>wins: 64</div>
                            <div className={"stats"}>games played: 140</div>
                        </div>
                        <Button content={"change password"} className={"hollow-btn skinny"}></Button>
                        <Button content={"delete account"} className={"hollow-btn skinny"} onPress={()=>  toggleDeleteAccountPopup()}></Button>
                    </div>
                </div>
            </div>
            {deleteAccountPopup && <ConfirmationPopup cancelAction={() => toggleDeleteAccountPopup()} confirmText={"delete account"}
                                                      title={"delete account"} body={"are you sure you want to delete your account?"} confirmAction={() => console.log("deleted account")}/>}

            {lobbyPopup && <QueuePopup closeAction={() => toggleLobbyPopup()} confirmText={"sign out"}
                                       title={"sign out"} body={"are you sure you want to sign out?"} confirmAction={() => console.log("signed out")}/>}

        </div>
    );
};

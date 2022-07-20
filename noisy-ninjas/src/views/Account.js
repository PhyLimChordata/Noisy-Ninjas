import React, {useState} from "react";
import "../style/Account.css"
import {Button} from "../components/Button";
import {ConfirmationPopup} from "../components/popups/ConfirmationPopup";
import {QueuePopup} from "../components/popups/QueuePopup";
import {useNavigate} from "react-router";
import {changePassword, changeUsername, deleteAccount, getUsername, login} from "../apiService";
import {Input} from "../components/Input";
import {InputPopup} from "../components/popups/InputPopup";
export function Account ()  {
    const [deleteAccountPopup, setDeleteAccountPopup] = useState(false)
    const [changePasswordPopup, setChangePasswordPopup] = useState(false)
    const [changeUsernamePopup, setChangeUsernamePopup] = useState(false)

    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    function submitUsernameChange() {
        if (newPassword == newPassword2) {
            changePassword(newPassword).then(() => {
                toggleChangePasswordPopup()
                setErrorMessage(null)
                alert("Password was changed")
            }).catch((err) => {
                const res = err.response
                setErrorMessage(res.data)
            })
        } else {
            setErrorMessage("Passwords do not match")
        }
    }

    const changePasswordBody = (
        <div id={"change-password-popup-body"}>
            <Input className={"form-element black-input"} placeholder={"new password"} value={newPassword} type={"password"}
                   onChange={(e) => {
                       setNewPassword(e.target.value)
                       if (errorMessage) {
                           setErrorMessage(null)
                       }
                   }} />
            <Input className={"form-element black-input"} placeholder={"renter new password"} value={newPassword2} type={"password"}
                   onChange={(e) => {
                       setNewPassword2(e.target.value)
                       if (errorMessage) {
                           setErrorMessage(null)
                       }
                   }} />
            {(errorMessage) && <div className={"error-text"}>{errorMessage}</div>}
        </div>
        )

    function submitPasswordChange() {
        if (newPassword == newPassword2) {
            changePassword(newPassword).then(() => {
                toggleChangePasswordPopup()
                alert("Password was changed")
                setErrorMessage(null)
            }).catch((err) => {
                const res = err.response
                setErrorMessage(res.data)
            })
        } else {
            setErrorMessage("Passwords do not match")
        }
    }

    function submitUsernameChange() {
        changeUsername(newUsername).then(() => {
            toggleChangeUsernamePopup()
            alert("Username was changed")
            setErrorMessage(null)
        }).catch((err) => {
            const res = err.response
            if (res.status === 409) {
                setErrorMessage("Username already in use")
            } else {
                setErrorMessage(res.data)
            }
        })
    }

    const changeUsernameBody = (
        <div>
            <Input className={"form-element black-input"} placeholder={"new username"} value={newUsername}
                   onChange={(e) => {
                       setNewUsername(e.target.value)
                       if (errorMessage) {
                           setErrorMessage(null)
                       }
                   }} />
            {(errorMessage) && <div className={"error-text"}>{errorMessage}</div>}
        </div>
    )


    const navigate = useNavigate();
    function getUserStats() {
        return  {wins: 64, gamesPlayed: 119}
    }
    const username = getUsername()
    const {wins, gamesPlayed} = getUserStats()
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
                            <img style={{height:"30px"}} className={"clickable"} onClick={() =>  toggleChangeUsernamePopup()}src={require("../assets/static/edit-icon.png")} alt={"monster-drako"}/>
                        </div>
                        <div className={"stats-container"}>
                            <div className={"stats"}>wins: {wins}</div>
                            <div className={"stats"}>games played: {gamesPlayed}</div>
                        </div>
                        <Button content={"change password"} className={"hollow-btn skinny"} onPress={()=>  toggleChangePasswordPopup()}></Button>
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

            {changePasswordPopup && <InputPopup confirmText={"change password"} title={"change password"} body={changePasswordBody} confirmAction={() => submitPasswordChange()}
                                                cancelAction={() => {
                                                    toggleChangePasswordPopup()
                                                    setErrorMessage(null)
                                                }} />}

            {changeUsernamePopup && <InputPopup confirmText={"change username"} title={"change username"} body={changeUsernameBody}
                                                confirmAction={() => submitUsernameChange()} cancelAction={() => {
                toggleChangeUsernamePopup()
                setErrorMessage(null)
            }}

            />}

        </div>
    );
};

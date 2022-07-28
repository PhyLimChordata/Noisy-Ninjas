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
    const [role, setRole] = useState("monster");
    const [skinIndex, setSkinIndex] = useState(0);
    const [monsterIndex, setMonsterIndex] = useState(0);

    const skins = [require("../assets/static/black-ninja.png"), require("../assets/static/red-ninja.png"), require("../assets/static/blue-ninja.png"), require("../assets/static/green-ninja.png"), require("../assets/static/pink-ninja.png")];
    const monsterKeys = ["draco", "screamer", "tiny"];
    const monster = {"draco": require("../assets/images/characters/draco.png"), "screamer": require("../assets/images/characters/screamer.png"), "tiny": require("../assets/images/characters/tiny.png")}
    const navigate = useNavigate();
    const username = getUsername()
    function toggleSignOutPopup() {
        setSignOutPopup(!signOutPopup)
    }
    function toggleLobbyPopup() {
        setLobbyPopup(!lobbyPopup)
    }
    function selectPrev() {
        if (role === "ninja") {
            if (skinIndex != 0) {
                setSkinIndex(skinIndex - 1);
            } else setSkinIndex(skins.length-1);
        } else {
            if (monsterIndex != 0) {
                setMonsterIndex(monsterIndex - 1);
            } else setMonsterIndex(monsterKeys.length-1);
        }
    }
    function selectNext() {
        if (role === "ninja") {
            if (skinIndex != skins.length-1) {
                setSkinIndex(skinIndex + 1);
            } else setSkinIndex(0);
         } else {
                if (monsterIndex != monsterKeys.length-1) {
                    setMonsterIndex(monsterIndex + 1);
                } else setMonsterIndex(0);
            }
    }
    return (
        <div className={"lobby-page"}>
            <div className={"title"}> Welcome {username}</div>
            {role === "ninja" ? <img className={"role-select"} src={require("../assets/static/monster-role.png")} onClick={() => setRole("monster")}/> : <img className={"role-select"} src={require("../assets/static/ninja-role.png")} onClick={() => setRole("ninja")}/> }
            <div className={"body"}>
                <div className={"select"}>
                    <div className={"options"}>
                        <img className={"arrow-img left"} src={require("../assets/static/triangle-right.png")} alt={"left-arrow"} onClick={() => selectPrev()}/>
                        {role === "ninja" ? <img className={"ninja-img"} src={skins[skinIndex]} alt={"current-ninja"}/> : <img className={"ninja-img"} src={monster[monsterKeys[monsterIndex]]} alt={"current-monster"}/>}
                        
                        <img className={"arrow-img"} src={require("../assets/static/triangle-right.png")} alt={"right-arrow"} onClick={() => selectNext()}/>
                    </div>
                </div>
                <div className={"button-container"}>
                    <div className={"button-inner-container"}>
                        <Button content={"play"} className={"hollow-btn skinny"} onPress={() => toggleLobbyPopup()}></Button>
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
                                                        navigate(0)
                                                    })
            }}/>}

            {lobbyPopup && <QueuePopup closeAction={() => toggleLobbyPopup()} confirmText={"sign out"}
                                                title={"sign out"} body={"are you sure you want to sign out?"} confirmAction={() => console.log("signed out")}/>}

        </div>
    );
};

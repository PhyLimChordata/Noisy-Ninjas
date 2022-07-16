import React from "react";
import "../style/Lobby.css"
import {Button} from "../components/Button";
export function Lobby ()  {
    return (
        <div id={"body-container"}>
            <div className={"title"}> Welcome KingSlayer69420 </div>
            <div style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"center", alignItems:"center"}}>
                <div style={{flex:1, display:"flex", justifyContent:"flex-end", alignItems:"center", marginRight:"25px"}}>
                    <img style={{height:"40px", transform: "rotateY(180deg)"}} src={require("../assets/static/triangle.png")} alt={"left-arrow"}/>
                    <img style={{height:"400px"}} src={require("../assets/static/ninja.png")} alt={"current-ninja"}/>
                    <img style={{height:"40px"}} src={require("../assets/static/triangle.png")} alt={"right-arrow"}/>
                </div>
                <div style={{flex:1, display:"flex", justifyContent:"flex-start", alignItems:"center", marginLeft:"25px"}}>
                    <div style={{width:"300px"}}>
                        <Button content={"play"} className={"orange-btn skinny"}></Button>
                        <Button content={"profile"} className={"hollow-btn skinny"}></Button>
                        <Button content={"leaderboard"} className={"hollow-btn skinny"}></Button>
                        <Button content={"sign out"} className={"hollow-btn skinny"}></Button>
                    </div>
                </div>
            </div>

            {/*<div id={"form-col"}>*/}
            {/*    <div>*/}
            {/*        <div className={"oauth-container"}>*/}
            {/*            <div className={"clickable oauth-btn"} onClick={() => googleLogin()}>*/}
            {/*                <img className={"oauth-icon"} src={require("../assets/static/google-icon.png")}/>*/}
            {/*            </div>*/}
            {/*            <div className={"clickable oauth-btn"}>*/}
            {/*                <img className={"oauth-icon"} src={require("../assets/static/facebook-icon.png")}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className={"clickable"} onClick={() => console.log('forgot pass?')}>*/}
            {/*            forgot password?*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

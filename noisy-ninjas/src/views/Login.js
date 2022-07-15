import React from "react";
import {Input} from "../components/Input";
import "../style/Login.css"
import {Button} from "../components/Button";
import {Checkbox} from "../components/Checkbox";
import {White} from "../assets/colors";
export function Login ()  {
    return (
        <div style={{display:"flex", flexDirection:"row", height:"100%"}}>
            <div style={{flex:1, overflow:"hidden"}}>
                <img height={"100%"} src={require("../assets/static/log-in-background.png")}/>
            </div>
            <div style={{display: "flex", flex:1, flexDirection:'column', textAlign:"center", justifyContent:"center", margin:"0px 50px 0px 50px"}}>
                <div className={"title"}> Noisy Ninjas </div>
                <form >
                    <div style={{flex: 1, height:"130px", margin:"20px 0px 20px 0px", justifyContent:"space-between", flexDirection:"column", display:"flex",  alignItems:"flex-start"}}>
                        <Input backgroundColor={"#222222"} placeholder={"username"} width={"100%"}/>
                        <Input backgroundColor={"#222222"} placeholder={"password"} width={"100%"}/>
                        <div>
                            <Checkbox backgroundColor={"#222222"}/>
                            <label> stay signed in </label>
                        </div>
                    </div>

                    <Button type="submit" content={"log in"} width={"100%"}></Button>
                </form>
                <div style={{display:"flex", flexDirection:"column", textAlign:'center', alignItems:"center"}}>
                    <div style={{display:"flex", flexDirection:"row",  marginBottom:"10px"}}>
                        <div className={"clickable"} style={{width:"100px", height:"50px", backgroundColor:White, borderRadius:"5px", marginRight:"10px", justifyContent:'center', alignItems:"center", display:"flex"}}>
                            <img height={"80%"} src={require("../assets/static/google-icon.png")}/>
                        </div>
                        <div className={"clickable"} style={{width:"100px", height:"50px", backgroundColor:White, borderRadius:"5px", justifyContent:'center', alignItems:"center", display:"flex"}}>
                            <img height={"80%"} src={require("../assets/static/facebook-icon.png")}/>
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

import React, {useEffect, useRef, useState} from 'react'
import {Black, White} from "../../assets/colors";
import '../../style/Popup.css'
import {Button} from "../Button";
import {ClosablePopup} from "./ClosablePopup";
export function QueuePopup(props) {
    const {closeAction} = props

    const [timer, setTimer] = useState(0)
    const timerRef = useRef(timer)

    const [ninja1, setNinja1] = useState(false)
    const [ninja2, setNinja2] = useState(false)
    const [ninja3, setNinja3] = useState(true)
    const [ninja4, setNinja4] = useState(false)
    const [monster, setMonster] = useState(false)
    useEffect(() => {
        const interval = setInterval(increment, 1000);
        return () => {
            clearInterval(interval)
        };
    }, [])
    useEffect(() => {
        timerRef.current = timer
    }, [timer])

    const increment = () => {
        setTimer(timerRef.current + 1)
        // Check if everyone's ready
        if (false) {
            console.log("dasdas")
            // START GAME
        }
    }


    function formatTime(seconds)
    {
        // Hours, minutes and seconds
        const hrs = ~~(seconds / 3600);
        const mins = ~~((seconds % 3600) / 60);
        const secs = ~~seconds % 60;

        let ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }
    const title = <div className={"queue-title display-linebreak"}>
        waiting for players... {'\n'}
        {formatTime(timer)}
    </div>
    const body = <div style={{textAlign:'center'}}>
        <div>
        <img className={"monster-img"} style={{opacity: !monster && 0.2}} src={require("../../assets/static/monster-drako.png")} alt={"monster-drako"}/>
        </div>
        <img className={"ninja-img"} style={{opacity: !ninja1 && 0.2}} src={require("../../assets/static/ninja.png")} alt={"current-ninja"}/>
        <img className={"ninja-img"} style={{opacity: !ninja2 && 0.2}} src={require("../../assets/static/ninja.png")} alt={"current-ninja"}/>
        <img className={"ninja-img"} style={{opacity: !ninja3 && 0.2}} src={require("../../assets/static/ninja.png")} alt={"current-ninja"}/>
        <img className={"ninja-img"} style={{opacity: !ninja4 && 0.2}} src={require("../../assets/static/ninja.png")} alt={"current-ninja"}/>

    </div>
    return (
        <ClosablePopup closeAction={closeAction} title={title} body={body} modalStyle={{padding:"20px"}}/>
    )
}




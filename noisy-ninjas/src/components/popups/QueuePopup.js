import React, { useEffect, useRef, useState } from 'react'
import '../../style/Popup.css'
import { generateMatch, getUsername } from '../../apiService'
import {ClosablePopup} from "./ClosablePopup";
import {useNavigate} from "react-router";

import { w3cwebsocket as W3CWebSocket } from "websocket";

export const client = new W3CWebSocket('ws://localhost:8000');


export function QueuePopup(props) {
  const {closeAction, role } = props

  const [timer, setTimer] = useState(0)
  const timerRef = useRef(timer)

  const [ninja1, setNinja1] = useState(false)
  const [ninja2, setNinja2] = useState(false)
  const [ninja3, setNinja3] = useState(false)
  const [ninja4, setNinja4] = useState(false)
  const [monster1, setMonster1] = useState(false);

  const [matchFound, setMatchFound] = useState("");

  const [ninja1Image, setNinja1Image] = useState(require('../../assets/static/queue/black-ninja.png'));
  const [ninja2Image, setNinja2Image] = useState(require('../../assets/static/queue/black-ninja.png'));
  const [ninja3Image, setNinja3Image] = useState(require('../../assets/static/queue/black-ninja.png'));
  const [ninja4Image, setNinja4Image] = useState(require('../../assets/static/queue/black-ninja.png'));

  const [monsterImage, setMonsterImage] = useState(require('../../assets/static/bosses/draco.png'));

  const ninja = {
    "black-ninja": require('../../assets/static/lobby/ninjas/black-ninja.png'),
    "red-ninja": require('../../assets/static/lobby/ninjas/red-ninja.png'),
    "blue-ninja": require('../../assets/static/lobby/ninjas/blue-ninja.png'),
    "green-ninja": require('../../assets/static/lobby/ninjas/green-ninja.png'),
    "pink-ninja": require('../../assets/static/lobby/ninjas/pink-ninja.png'),
  }

  const monster = {
    draco: require('../../assets/static/bosses/draco.png'),
    screamer: require('../../assets/static/bosses/screamer.png'),
    tiny: require('../../assets/static/bosses/tiny.png'),
  }

  useEffect(() => {
    const interval = setInterval(increment, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  useEffect(() => {
    timerRef.current = timer
    
  }, [timer])

  const navigate = useNavigate();

client.onmessage = (message) => {
    let parsedData = JSON.parse(message.data);

    let ninjaQueue = parsedData.ninjaQueue;
    let monsterQueue = parsedData.monsterQueue;

    
    let matchID = parsedData.matchID;


    let inNinjaQueue = ninjaQueue.find(e => e.name === getUsername());
    let inMonsterQueue = monsterQueue.find(e => e.name === getUsername());

    let lastToJoin = "";

    let ninjas = []
    if (inNinjaQueue) {
        lastToJoin = inNinjaQueue.name
    }

    if (matchID && (inNinjaQueue || inMonsterQueue)) {
        setMatchFound(matchID);
        
        navigate('/game', {
            state: { role: role, matchID: matchID },
        });
    } 
    else if ((inNinjaQueue || inMonsterQueue) && ninjaQueue.length == 2 && monsterQueue.length == 1 && lastToJoin === getUsername()) {
        ninjaQueue.forEach((ninja) => {
            ninjas.push(ninja.name);
        })

        generateMatch(ninjas, monsterQueue[0].name).then((matchID) => {
            client.send(JSON.stringify({
                type: "matchFound",
                matchID: matchID,
                ninjaQueue: ninjaQueue,
                monsterQueue: monsterQueue
            }));
        });
    } 

    console.log("hit");
    console.log(ninjaQueue);
    console.log(monsterQueue);
    console.log(inNinjaQueue);
    console.log(inMonsterQueue)

    // Update the queue popup
    if (inNinjaQueue || inMonsterQueue) {
        let monsterInQueue = monsterQueue.find(e => e.skin === "draco" || e.skin === "tiny" || e.skin === "screamer");
        console.log("Oh gawd")
        console.log(monsterInQueue)
        if (monsterInQueue === undefined) {
            setMonster1(false);
        } else {
            setMonster1(true);
            setMonsterImage(monster[monsterInQueue.skin]);
        }
    
        let ninjasInQueue = 0;
        let ninjaArr = [[setNinja1, setNinja1Image], [setNinja2, setNinja2Image], [setNinja3, setNinja3Image], [setNinja4, setNinja4Image]];
        while (ninjaQueue.length > ninjasInQueue) {
            let nextNinjaInQueue = ninjaQueue[ninjasInQueue]
    
            ninjaArr[ninjasInQueue][0](true);
            ninjaArr[ninjasInQueue][1](ninja[nextNinjaInQueue.skin])
            ninjasInQueue++;
        }
    
        while (ninjasInQueue < ninjaArr.length) {
            ninjaArr[ninjasInQueue][0](false);
            ninjaArr[ninjasInQueue][1](require('../../assets/static/queue/black-ninja.png'))
            ninjasInQueue++;
        }
    }
    
}
  
  const increment = () => {
    setTimer(timerRef.current + 1)
}

  function formatTime(seconds) {
    // Hours, minutes and seconds
    const hrs = ~~(seconds / 3600)
    const mins = ~~((seconds % 3600) / 60)
    const secs = ~~seconds % 60

    let ret = ''

    if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
    }

    ret += '' + mins + ':' + (secs < 10 ? '0' : '')
    ret += '' + secs
    return ret
  }
  const waitingTitle = (
    <div className={'queue-title display-linebreak'}>
      waiting for players...{'\n'}
      {formatTime(timer)}
    </div>
  )

  // &nbsp; to ensure even if its empty it takes space
  const readyTitle = (
    <div className={'queue-title display-linebreak'}>
      match found!{'\n'}
      &nbsp;
    </div>
  )

  //TODO: Consider what gets shown in queue
  const body = (
    <div style={{ textAlign: 'center' }}>
      <div>
        <img
          className={'monster-img'}
          style={{ opacity: !monster1 && 0.2 }}
          src={monsterImage}
          alt={'monster-draco'}
        />
      </div>
      <img
        className={'ninja-img'}
        style={{ opacity: !ninja1 && 0.2 }}
        src={ninja1Image}
        alt={'current-ninja'}
      />
      <img
        className={'ninja-img'}
        style={{ opacity: !ninja2 && 0.2 }}
        src={ninja2Image}
        alt={'current-ninja'}
      />
      <img
        className={'ninja-img'}
        style={{ opacity: !ninja3 && 0.2 }}
        src={ninja3Image}
        alt={'current-ninja'}
      />
      <img
        className={'ninja-img'}
        style={{ opacity: !ninja4 && 0.2 }}
        src={ninja4Image}
        alt={'current-ninja'}
      />
    </div>
  )
  return (
    <ClosablePopup
      closeAction={closeAction}
      title={
        monster && ninja1 && ninja2 && ninja3 && ninja4
          ? readyTitle
          : waitingTitle
      }
      body={body}
      modalStyle={{ padding: '20px' }}
    />
  )
}

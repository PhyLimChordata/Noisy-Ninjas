import React, { useEffect, useRef, useState } from 'react'
import '../../style/Popup.css'
import { generateMatch, getUsername } from '../../apiService'
import { ClosablePopup } from './ClosablePopup'
import { useNavigate } from 'react-router'

import { ninjaMapping } from '../../assets/mappings/ninja-mapping'
import { monsterMapping } from '../../assets/mappings/monster-mapping'
import { w3cwebsocket as W3CWebSocket } from "websocket";

require('dotenv').config({ path: '../../../../.env' })

export const client = new W3CWebSocket(process.env.WEBSOCKET_SERVER);

export function QueuePopup(props) {
  const { closeAction, role } = props
  const [timer, setTimer] = useState(0)
  const timerRef = useRef(timer)

  const [ninja1, setNinja1] = useState(false)
  const [ninja2, setNinja2] = useState(false)
  const [ninja3, setNinja3] = useState(false)
  const [ninja4, setNinja4] = useState(false)
  const [monster, setMonster] = useState(false)
  const [ninja1Image, setNinja1Image] = useState(ninjaMapping['black-ninja'])
  const [ninja2Image, setNinja2Image] = useState(ninjaMapping['black-ninja'])
  const [ninja3Image, setNinja3Image] = useState(ninjaMapping['black-ninja'])
  const [ninja4Image, setNinja4Image] = useState(ninjaMapping['black-ninja'])

  const [monsterImage, setMonsterImage] = useState(monsterMapping['draco'])

  useEffect(() => {
    const interval = setInterval(increment, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  useEffect(() => {
    timerRef.current = timer
  }, [timer])

  const navigate = useNavigate()

  client.onmessage = (message) => {
    const parsedData = JSON.parse(message.data)

    const queue = parsedData.queue
    const ninjaQueue = parsedData.ninjaQueue
    const monsterQueue = parsedData.monsterQueue
    const matchID = parsedData.matchID

    let inNinjaQueue = undefined
    let inMonsterQueue = undefined

    if (ninjaQueue) {
      inNinjaQueue = ninjaQueue.find((e) => e.name === getUsername())
    }
    if (monsterQueue) {
      inMonsterQueue = monsterQueue.find((e) => e.name === getUsername())
    }
    const lastToJoin = inNinjaQueue ? inNinjaQueue.name : ''

    if (matchID && (inNinjaQueue || inMonsterQueue)) {
      navigate('/game', {
        state: { role: role, matchID: matchID },
      })
    } else if (
      (inNinjaQueue || inMonsterQueue) &&
      ninjaQueue.length >= 1 &&
      monsterQueue.length === 1 &&
      lastToJoin === getUsername()
    ) {
      generateMatch(ninjaQueue, monsterQueue[0]).then((matchID) => {
        client.send(
          JSON.stringify({
            type: 'matchFound',
            matchID: matchID,
            ninjaQueue: ninjaQueue,
            monsterQueue: monsterQueue,
            queue: queue,
          })
        )
      })
    }

    // Update the queue popup
    if (inNinjaQueue || inMonsterQueue) {
      const monsterInQueue = monsterQueue.find(
        (e) => e.skin === 'draco' || e.skin === 'tiny' || e.skin === 'screamer'
      )
      if (monsterInQueue === undefined) {
        setMonster(false)
      } else {
        setMonster(true)
        setMonsterImage(monsterMapping[monsterInQueue.skin])
      }

      let ninjasInQueue = 0
      let ninjaArr = [
        [setNinja1, setNinja1Image],
        [setNinja2, setNinja2Image],
        [setNinja3, setNinja3Image],
        [setNinja4, setNinja4Image],
      ]
      while (ninjaQueue.length > ninjasInQueue) {
        let nextNinjaInQueue = ninjaQueue[ninjasInQueue]

        ninjaArr[ninjasInQueue][0](true)
        ninjaArr[ninjasInQueue][1](ninjaMapping[nextNinjaInQueue.skin])
        ninjasInQueue++
      }

      while (ninjasInQueue < ninjaArr.length) {
        ninjaArr[ninjasInQueue][0](false)
        ninjaArr[ninjasInQueue][1](ninjaMapping['black-ninja'])
        ninjasInQueue++
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

  const body = (
    <div style={{ textAlign: 'center' }}>
      <div>
        <img
          className={'monster-img'}
          style={{ opacity: !monster && 0.2 }}
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

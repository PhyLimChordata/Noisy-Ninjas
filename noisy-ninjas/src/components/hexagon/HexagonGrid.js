import React, { useState } from 'react'
import '../../style/hexagon.css'
import { Hexagon } from './Hexagon'

import {
  movePlayer,
  newPOV,
  shuriken,
  explosion,
  echo,
  scream,
  ninjaHealth,
  monsterHealth,
  getNinjas,
  getUsername,
  winPoints, 
  losePoints,
  getMonsterChat,
  getNinjaChat

} from '../../apiService'

import { client } from '../popups/QueuePopup'
import { characterPOV, eloGain, eloLoss, timePerRound } from '../../assets/mappings/character-mappings'
import { ninjaBombRange, ninjaShurikenRange } from '../../assets/mappings/ninja-mapping'
import { monsterScreamRange, monsterEchoRange } from '../../assets/mappings/monster-mapping'

export function HexagonGrid(props) {
  const { matchID, routeRole, role, mode, setMode, setTimer, POV, x, y, setHearts, setLive, setElo, setWon, setSummaryTitle, proximityChat, closeProxChat } = props
  const [type, setType] = useState(POV)
  const [srcx, setSrcX] = useState(x)
  const [srcy, setSrcY] = useState(y)
  const [playersInRange, setPlayersInRange] = useState({})

  // Process end of player turns
  client.onmessage = (message) => {
    let parsedData = JSON.parse(message.data);
    //TODO: Check if in game
    if (parsedData.message === "ready" && matchID === parsedData.data) {
      updatePOV(srcx,srcy, characterPOV);
      setTimer(timePerRound);
      setMode("move");
    }
    if (parsedData.message === "monster won" && matchID === parsedData.data.matchId) {
      if (role === "monster") {
        win();
      }
    }    
    if (parsedData.message === "ninjas won" && matchID === parsedData.data.matchId) {
      if (role === "ninja") {
        win();
      }
    }
  };
  
  // Update hp of players, provide the hexes to determine if the player is standing on 
  // a hex that hurts them
  const processHP = (hex) => {
    if (role === "ninja") {
      if (hex["type"] && hex["type"][0] === "scream" || hex["type"][0] === "echo") {
        ninjaHealth(matchID).then((updated_health) => {
          updated_health < 0 ? setHearts(0) : setHearts(updated_health);
          new Audio(require('../../assets/sound-effects/heart.wav')).play()
          if (updated_health === 0) {
            lose();
            setTimer(0)
          }
      })
    }
  }
    else {
      if (hex["type"] && hex["type"][0] === "shuriken" || hex["type"][0] === "bomb") {
        monsterHealth(matchID).then((updated_health) => {
          updated_health < 0 ? setHearts(0) : setHearts(updated_health)
          new Audio(require('../../assets/sound-effects/heart.wav')).play()
          if (updated_health === 0) {
            lose();
            setTimer(0);
          }
        })
    }
  }
};

const lose = () => {
  setMode('dead')
  setLive(false);
  setWon(false);
  setSummaryTitle("You died");

  client.send(JSON.stringify({
    type: "death",
    matchId: matchID,
    name: getUsername(),
    skin: routeRole
  }))

  losePoints().then((res) => {
    if (res.demoted) {
    }
    setElo(res.user.points - eloLoss);
  })
}

const win = () => {
  setMode('win')
  setLive(false);
  setWon(true);
  setSummaryTitle("You Won!");
  winPoints().then((res) => {
    if(res.promoted) {
    }
    setElo(res.user.points + eloGain);
  })
}

// Updates the game on every mouse click -> Takes in information regarding the hex clicked
  const update = (x, y, direction, hexInfo) => {
    // Edge of the map / Unclickable
    if (!hexInfo.type) {
      return;
    }

    if (mode === 'move') {
      movePlayer(matchID, srcx, srcy, x, y, routeRole).then(() => {
        updatePOV(x, y, characterPOV)
        setTimer(timePerRound)
        setSrcX(x)
        setSrcY(y)
        updateMode()
      })
    }

    if (mode === 'direction-S') {

      // Determines direction of action "S"
      let dir = 'up'
      let dirLetter = direction.slice(2, direction.length - 1)

      if (dirLetter === 'U') {
        dir = 'up'
      } else if (dirLetter === 'D') {
        dir = 'down'
      } else if (dirLetter === 'L') {
        dir = 'left'
      } else if (dirLetter === 'R') {
        dir = 'right'
      } else {
        return;
      }
      setTimer(timePerRound)

      //Complete action
      if (role === 'ninja') {
        throwShuriken(ninjaShurikenRange, dir).then(() => {
          updateMode()
        })
      } else {
        yellEcho(monsterEchoRange, dir).then(() => {
          updateMode()
      })
      }
    }

    if (mode === 'direction-E') {
      
      // Determines direction of action "E"
      let dirLetter = direction.slice(2, direction.length - 1)

      if (dirLetter.length === 2) {
        dirLetter = dirLetter.slice(0, dirLetter.length - 1)
      }

      let dir = 'up'
      if (dirLetter === 'U') {
        dir = 'up'
      } else if (dirLetter === 'D') {
        dir = 'down'
      } else if (dirLetter === 'L') {
        dir = 'left'
      } else if (dirLetter === 'R') {
        dir = 'right'
      } else {
        return false
      }

      setTimer(timePerRound)

      if (role === 'ninja') {
        throwBomb(ninjaBombRange, dir).then(() => {
          updateMode()
        })
      } else {
        yellScream(monsterScreamRange, dir).then(() => {
          updateMode()
        })
      }
    }
  }

  // Updates the mode of the user's state (Move, Action, Direction(optional), Wait, Dead)
  const updateMode = () => {
    if (mode === 'dead') {
      getNinjas(matchID).then((ninjas) => {
        let live = false
        ninjas.forEach((ninja) => {
          if (ninja.health !== 0) {
            live = true
          }
        })
        if (!live) {
          setMode("monster won");
        }
      });
      document.getElementById("move1").style.visibility = "hidden";
      document.getElementById("move2").style.visibility = "hidden";
    } else if (mode === "move") {
      setMode("action");
      document.getElementById("move1").style.visibility = "visible";
      document.getElementById("move2").style.visibility = "visible";
    } else if (mode === "direction-S" || mode === "direction-E" || mode === "direction") {
      setMode("wait");
      setTimer(0);

      client.send(JSON.stringify({
        type: "update",
        matchId: matchID,
        name: getUsername()
      }));
    }
  }

  // Updates what the users see based on where they are on the map
  const updatePOV = (x = -1, y = -1, radius = 0) => {
    if (x === -1) {
      return
    }

    let grid = {}

    newPOV(matchID, x, y, radius).then((hexes) => {
      let players = {}
      let newPlayersInRange = playersInRange

      hexes.forEach((hex) => {
        grid[hex['newCor']] = hex

        // Determines if you are standing on a hex (0,0) that will harm you
        if (hex['newCor'] === "cor0,0") {
          processHP(hex);
        }

        if (hex['players']) {
          // Determines if a player should engage in proximity chat with another player
          hex['players'].forEach((player) => {
            if (player.displayName !== null && !Object.keys(playersInRange).includes(player.displayName)) {
              if (["draco", "screamer", "tiny"].includes(player.skin)) {
                  getMonsterChat(player.displayName, matchID).then((chatId) => {
                    proximityChat(chatId);
                    players[player.displayName] = chatId;
                    newPlayersInRange[player.displayName] = chatId
                  })
                } else {
                  getNinjaChat(player.displayName, matchID).then((chatId) => {
                    proximityChat(chatId);
                    players[player.displayName] = chatId;
                    newPlayersInRange[player.displayName] = chatId
                })
              }
            }
          })
        }
      })

      // Determines if a player should disengage from a proximity call
      Object.keys(playersInRange).forEach((player) => {
        if (!Object.keys(players).includes(player)) {
          closeProxChat(newPlayersInRange[player]);
          delete newPlayersInRange[player]
        }
      })
      setPlayersInRange(newPlayersInRange)
      setType(grid)
    })
  }

  const throwShuriken = (range = 0, dir) => {
    return shuriken(matchID, dir, srcx, srcy, range)
  }

  const throwBomb = (range = 0, dir) => {
    return explosion(matchID, dir, srcx, srcy, range)
  }

  const yellEcho = (range = 0, dir) => {
    return echo(matchID, dir, srcx, srcy, range)
  }

  const yellScream = (range = 0, dir) => {
    return scream(matchID, dir, srcx, srcy, range)
  }

  // Hover animation showing users what hexes their actions will cover
  // Affected hexes will highlight orange. Accomplishes this by manipulating IDs of the hex on certain modes
  let showDirection = (id, range) => {
    if (mode === 'direction-S') {
      if (id.slice(0, 1) !== 'S') {
        return
      }
      id = id.slice(0, id.length - 1)
      for (let i = 1; i < range + 1; i++) {
        document.getElementById('hex' + id + i).style.backgroundColor = 'orange'
      }
    } else if (mode === 'direction-E') {
      id = id.slice(0, id.length - 1)

      let dir = id.slice(2, id.length)
      let prefix = id.slice(0, 2)
      if (id.length === 4) {
        dir = id.slice(id.length - 2, id.length - 1)
      }
      let i = 1
      while (document.getElementById('hex' + prefix + dir + i)) {
        document.getElementById(
          'hex' + prefix + dir + i
        ).style.backgroundColor = 'orange'
        i++
      }

      if (dir) {
        i = 1
        while (document.getElementById('hex' + prefix + dir + 'L' + i)) {
          document.getElementById(
            'hex' + prefix + dir + 'L' + i
          ).style.backgroundColor = 'orange'
          i++
        }

        i = 1
        while (document.getElementById('hex' + prefix + dir + 'R' + i)) {
          document.getElementById(
            'hex' + prefix + dir + 'R' + i
          ).style.backgroundColor = 'orange'
          i++
        }
        i++
      }
    }
  }


  // Unhover animation reverting the highlighted hexes of the actions being decided on
  // Affected hexes will revert to being purple. Accomplishes this by manipulating IDs of the hex on certain modes
  let unshowdirection = (id, range) => {
    if (mode !== 'direction-S' && mode !== 'direction-E') {
      for (let i = 1; i < 5; i++) {
        document.getElementById('hexA' + i).style.backgroundColor = '#9980fa'
        document.getElementById('hexG' + i).style.backgroundColor = '#9980fa'
      }
      for (let i = 1; i < 6; i++) {
        document.getElementById('hexB' + i).style.backgroundColor = '#9980fa'
        document.getElementById('hexF' + i).style.backgroundColor = '#9980fa'
      }
      for (let i = 1; i < 7; i++) {
        document.getElementById('hexC' + i).style.backgroundColor = '#9980fa'
        document.getElementById('hexE' + i).style.backgroundColor = '#9980fa'
      }
      for (let i = 1; i < 8; i++) {
        document.getElementById('hexD' + i).style.backgroundColor = '#9980fa'
      }
    }

    if (mode === 'direction-S') {
      if (id.slice(0, 1) !== 'S') {
        return
      }
      id = id.slice(0, id.length - 1)
      for (let i = 1; i < range + 1; i++) {
        document.getElementById('hex' + id + i).style.backgroundColor =
          '#9980fa'
      }
    } else if (mode === 'direction-E') {
      id = id.slice(0, id.length - 1)

      let dir = id.slice(2, id.length)
      let prefix = id.slice(0, 2)
      if (id.length === 4) {
        dir = id.slice(id.length - 2, id.length - 1)
      }
      let i = 1
      while (document.getElementById('hex' + prefix + dir + i)) {
        document.getElementById(
          'hex' + prefix + dir + i
        ).style.backgroundColor = '#9980fa'
        i++
      }

      if (dir) {
        i = 1
        while (document.getElementById('hex' + prefix + dir + 'L' + i)) {
          document.getElementById(
            'hex' + prefix + dir + 'L' + i
          ).style.backgroundColor = '#9980fa'
          i++
        }

        i = 1
        while (document.getElementById('hex' + prefix + dir + 'R' + i)) {
          document.getElementById(
            'hex' + prefix + dir + 'R' + i
          ).style.backgroundColor = '#9980fa'
          i++
        }
        i++
      }
    }
  }

  // The grid of hexagons -> Each holding properties representing the state of the game at a certain location
  return (
    <div className="main">
      <Hexagon
        id={mode === 'direction-E' ? 'E-UL1' : 'A1'}
        info={type['cor-3,-3']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={
          mode === 'direction-E'
            ? 'E-U1'
            : mode === 'direction-S'
            ? 'S-U1'
            : 'A2'
        }
        info={type['cor-2,-3']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-U2' : 'A3'}
        info={type['cor-1,-3']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-UR1' : 'A4'}
        info={type['cor0,-3']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />

      <Hexagon
        id={mode === 'direction-E' ? 'E-L1' : 'B1'}
        info={type['cor-3,-2']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-UL2' : 'B2'}
        info={type['cor-2,-2']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={
          mode === 'direction-E'
            ? 'E-U3'
            : mode === 'direction-S'
            ? 'S-U2'
            : 'B3'
        }
        info={type['cor-1,-2']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-UR2' : 'B4'}
        info={type['cor0,-2']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-R1' : 'B5'}
        info={type['cor1,-2']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />

      <Hexagon
        id={mode === 'direction-E' ? 'E-L2' : 'C1'}
        info={type['cor-3,-1']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-L3' : 'C2'}
        info={type['cor-2,-1']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={
          mode === 'direction-E'
            ? 'E-UL3'
            : mode === 'direction-S'
            ? 'S-U3'
            : 'C3'
        }
        info={type['cor-1,-1']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-UR3' : 'C4'}
        info={type['cor0,-1']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-R2' : 'C5'}
        info={type['cor1,-1']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-R3' : 'C6'}
        info={type['cor2,-1']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />

      <Hexagon
        id={
          mode === 'direction-E'
            ? 'E-L4'
            : mode === 'direction-S'
            ? 'S-L1'
            : 'D1'
        }
        info={type['cor-3,0']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={
          mode === 'direction-E'
            ? 'E-L5'
            : mode === 'direction-S'
            ? 'S-L2'
            : 'D2'
        }
        info={type['cor-2,0']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={
          mode === 'direction-E'
            ? 'E-L6'
            : mode === 'direction-S'
            ? 'S-L3'
            : 'D3'
        }
        info={type['cor-1,0']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon id="D4" info={type['cor0,0']} mode={mode} onClick={update} />
      <Hexagon
        id={
          mode === 'direction-E'
            ? 'E-R4'
            : mode === 'direction-S'
            ? 'S-R1'
            : 'D5'
        }
        info={type['cor1,0']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={
          mode === 'direction-E'
            ? 'E-R5'
            : mode === 'direction-S'
            ? 'S-R2'
            : 'D6'
        }
        info={type['cor2,0']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={
          mode === 'direction-E'
            ? 'E-R6'
            : mode === 'direction-S'
            ? 'S-R3'
            : 'D7'
        }
        info={type['cor3,0']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />

      <Hexagon
        id={mode === 'direction-E' ? 'E-L7' : 'E1'}
        info={type['cor-2,1']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-L8' : 'E2'}
        info={type['cor-1,1']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-DL1' : 'E3'}
        info={type['cor0,1']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={
          mode === 'direction-E'
            ? 'E-DR1'
            : mode === 'direction-S'
            ? 'S-D3'
            : 'E4'
        }
        info={type['cor1,1']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-R7' : 'E5'}
        info={type['cor2,1']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-R8' : 'E6'}
        info={type['cor3,1']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />

      <Hexagon
        id={mode === 'direction-E' ? 'E-L9' : 'F1'}
        info={type['cor-1,2']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-DL2' : 'F2'}
        info={type['cor0,2']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={
          mode === 'direction-E'
            ? 'E-D1'
            : mode === 'direction-S'
            ? 'S-D2'
            : 'F3'
        }
        info={type['cor1,2']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-DR2' : 'F4'}
        info={type['cor2,2']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-R9' : 'F5'}
        info={type['cor3,2']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />

      <Hexagon
        id={mode === 'direction-E' ? 'E-DL3' : 'G1'}
        info={type['cor0,3']}
        mode={mode}
        onClick={update}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-D2' : 'G2'}
        info={type['cor1,3']}
        mode={mode}
        onClick={update}
      />
      <Hexagon
        id={
          mode === 'direction-E'
            ? 'E-D3'
            : mode === 'direction-S'
            ? 'S-D1'
            : 'G3'
        }
        info={type['cor2,3']}
        mode={mode}
        onClick={update}
        hover={showDirection}
        unhover={unshowdirection}
      />
      <Hexagon
        id={mode === 'direction-E' ? 'E-DR3' : 'G4'}
        info={type['cor3,3']}
        mode={mode}
        onClick={update}
      />
    </div>
  )
}

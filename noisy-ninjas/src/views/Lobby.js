import React, { useState, useRef, useEffect } from 'react'
import '../style/Lobby.css'
import { Button } from '../components/Button'
import { ConfirmationPopup } from '../components/popups/ConfirmationPopup'
import { QueuePopup } from '../components/popups/QueuePopup'
import { useNavigate } from 'react-router'
import { getUsername, signOut, generateMatch } from '../apiService'
  
import { client } from '../components/popups/QueuePopup'
import {ninjaMapping} from "../assets/mappings/ninja-mapping";
import {monsterMapping} from "../assets/mappings/monster-mapping";

export function Lobby() {
  const [signOutPopup, setSignOutPopup] = useState(false)
  const [lobbyPopup, setLobbyPopup] = useState(false)
  const [role, setRole] = useState('monster')
  const [skin, setSkin] = useState('black-ninja')

  const [ninjaIndex, setNinjaIndex] = useState(0)
  const [monsterIndex, setMonsterIndex] = useState(0)

//   const [peerID, setPeerID] = useState(null);
//   const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
//   const remoteAudioRef = useRef(null);
//   const peerInstance = useRef(null);

//   //https://www.youtube.com/watch?v=5JTpRCo0e8s
//   useEffect(() => {
//     const peer = new Peer();

//     peer.on('open', (id) => {
//       setPeerID(id)
//     });

//     peer.on('proxChat', (chat) => {
//       var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//       getUserMedia({ video: true, audio: true }, (remoteAudio) => {
//         chat.answer(remoteAudio)
//         chat.on('stream', function(remoteStream) {
//           remoteAudioRef.current.srcObject = remoteStream
//           remoteAudioRef.current.play();
//         });
//       });
//     })

//     peerInstance.current = peer;

//   }, [])

//     // proxChat(remotePeerIdValue)

//   const proxChat = (remotePeerId) => {
//     var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//     getUserMedia({ video: true, audio: true }, (remoteAudio) => {

//       const chat = peerInstance.current.proxChat(remotePeerId, remoteAudio)

//       chat.on('stream', (remoteStream) => {
//         remoteAudioRef.current.srcObject = remoteStream
//         remoteAudioRef.current.play();
//       });
//     });
//   }
  
//   console.log(peerID);


  const navigate = useNavigate();

    const username = getUsername()
    function toggleSignOutPopup() {
        setSignOutPopup(!signOutPopup)
    }

   

    function toggleLobbyPopup() {
        setLobbyPopup(!lobbyPopup)

        if (!lobbyPopup) {
            client.send(JSON.stringify({
                type: "enter",
                name: getUsername(),
                skin: skin
              }));
        } else {
            client.send(JSON.stringify({
                type: "leave",
                name: getUsername(),
                skin: skin
              }));
        }
    }
  const ninjaKeys = ['black', 'red', 'blue', 'green', 'pink']
  const monsterKeys = ['draco', 'screamer', 'tiny']

  useEffect(() => {
    setSkin(ninjaKeys[ninjaIndex] + '-ninja')
  }, [ninjaIndex])

  useEffect(() => {
    setSkin(monsterKeys[monsterIndex])
  }, [monsterIndex])

  useEffect(() => {
    if (role === 'ninja') {
      setSkin(ninjaKeys[ninjaIndex] + '-ninja')
    } else {
      setSkin(monsterKeys[monsterIndex])
    }
  }, [role])

  function selectPrev() {
    if (role === 'ninja') {
      if (ninjaIndex !== 0) {
        setNinjaIndex(ninjaIndex - 1)
      } else {
        setNinjaIndex(ninjaKeys.length - 1)
      }
    } else {
      if (monsterIndex !== 0) {
        setMonsterIndex(monsterIndex - 1)
      } else setMonsterIndex(monsterKeys.length - 1)
    }
  }
  function selectNext() {
    if (role === 'ninja') {
      if (ninjaIndex !== ninjaKeys.length - 1) {
        setNinjaIndex(ninjaIndex + 1)
      } else setNinjaIndex(0)
    } else {
      if (monsterIndex !== monsterKeys.length - 1) {
        setMonsterIndex(monsterIndex + 1)
      } else setMonsterIndex(0)
    }
  }
  return (
    <div className={'lobby-page'}>
      <div className={'title'}> Welcome {username}</div>
      {role === 'ninja' ? (
        <img
          className={'role-select clickable'}
          alt={"monster-select"}
          src={require('../assets/static/lobby/icons/monster-role-icon.png')}
          onClick={() => setRole('monster')}
        />
      ) : (
        <img
          className={'role-select clickable'}
          alt={"ninja-select"}
          src={require('../assets/static/lobby/icons/ninja-role-icon.png')}
          onClick={() => setRole('ninja')}
        />
      )}
      <div className={'body'}>
        <div className={'select'}>
          <div className={'options'}>
            <img
              className={'arrow-img left'}
              src={require('../assets/static/icons/triangle-right-icon.png')}
              alt={'left-arrow'}
              onClick={() => selectPrev()}
            />
            {role === 'ninja' ? (
              <img
                className={'ninja-img'}
                src={ninjaMapping[skin]}
                alt={'current-ninja'}
              />
            ) : (
              <img
                className={'ninja-img'}
                src={monsterMapping[skin]}
                alt={'current-monster'}
              />
            )}

            <img
              className={'arrow-img'}
              src={require('../assets/static/icons/triangle-right-icon.png')}
              alt={'right-arrow'}
              onClick={() => selectNext()}
            />
          </div>
        </div>
        <div className={'button-container'}>
          <div className={'button-inner-container'}>
            <Button
              content={'play'}
              className={'hollow-btn skinny'}
              onPress={() => toggleLobbyPopup()}
            ></Button>
            <Button
              content={'profile'}
              className={'hollow-btn skinny'}
              onPress={() =>
                navigate('/account', {
                  state: { username: username, skin: skin },
                })
              }
            ></Button>
            {/* Consider what to show on leaderboard */}
            <Button
              content={'leaderboard'}
              className={'hollow-btn skinny'}
              onPress={() =>
                navigate('/leaderboard', { state: { skin: skin } })
              }
            ></Button>
            <Button
              content={'sign out'}
              className={'hollow-btn skinny'}
              onPress={() => toggleSignOutPopup()}
            ></Button>
          </div>
        </div>
      </div>
      {signOutPopup && (
        <ConfirmationPopup
          cancelAction={() => toggleSignOutPopup()}
          confirmText={'sign out'}
          title={'sign out'}
          body={'are you sure you want to sign out?'}
          confirmAction={() => {
            signOut().then(() => {
              navigate('/')
              navigate(0)
            })
          }}
        />
      )}
      {lobbyPopup && (
        <QueuePopup
          closeAction={() => toggleLobbyPopup()}
          role={skin}
        />
      )}
    </div>
  )
}

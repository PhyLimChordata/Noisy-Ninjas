import axios from 'axios'

/************************************************************
 *
 *  Credentials *
 *
 ************************************************************/

export function login(username, password) {
  return axios
    .post(
      '/api/signin',
      {
        displayName: username,
        password,
      },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function googleLogin() {
  return (window.location = 'https://noisy-ninjas.nn.r.appspot.com/api/google')
}

export function signUp(username, password) {
  return axios
    .post(
      '/api/signup',
      {
        displayName: username,
        password,
      },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function signOut() {
  return axios.get('/api/signout', { withCredentials: true }).then((res) => {
    return res.data
  })
}

export function deleteAccount() {
  const username = getUsername()
  return axios
    .delete(`/api/users/${username}`, { withCredentials: true })
    .then((res) => {
      return res.data
    })
}

export function changePassword(password) {
  const username = getUsername()
  return axios
    .patch(
      `/api/users/${username}/password`,
      {
        password,
      },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function changeUsername(newUsername) {
  const username = getUsername()
  return axios
    .patch(
      `/api/users/${username}/username`,
      {
        username: newUsername,
      },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function getUsername() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)displayName\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
}

export function getUser(name) {
  return axios
    .get(`/api/users/${name}`, { withCredentials: true })
    .then((res) => {
      return res.data
    })
}

/************************************************************
 *
 *  Gameplay *
 *
 ************************************************************/

export function generateMatch(ninjas, monster) {
    return axios.post(`/api/match/generate`, {mapID: '62e4920a3c0f976c00ccfe53', ninjas: ninjas, monster: monster}, {withCredentials: true }).then((res) => {
        return res.data;
    })
}

export function newPOV(matchID, x, y, radius) {
  return axios
    .post(
      `/api/match/source?x=${x}&y=${y}&radius=${radius}`,
      { matchID: matchID },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function getNinjas(matchID) {
  return axios
    .post(`/api/match/ninjas`, { matchID: matchID }, { withCredentials: true })
    .then((res) => {
      return res.data
    })
}

export function getMonsters(matchID) {
  return axios
    .post(`/api/match/monsters`, { matchID: matchID }, { withCredentials: true })
    .then((res) => {
      return res.data
    })
}

export function movePlayer(matchID, srcx, srcy, tarx, tary, routeRole) {
  return axios
    .patch(
      `/api/match/move/${getUsername()}?srcx=${srcx}&srcy=${srcy}&tarx=${tarx}&tary=${tary}`,
      { matchID: matchID },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function shuriken(matchID, direction, srcx, srcy, range) {
  return axios
    .patch(
      `/api/match/shuriken/${direction}?x=${srcx}&y=${srcy}&range=${range}`,
      { matchID: matchID, effect: 'shuriken' },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function explosion(matchID, direction, srcx, srcy, range) {
  return axios
    .patch(
      `/api/match/explosion/${direction}?x=${srcx}&y=${srcy}&range=${range}`,
      { matchID: matchID, effect: 'bomb' },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function echo(matchID, direction, srcx, srcy, range) {
  return axios
    .patch(
      `/api/match/shuriken/${direction}?x=${srcx}&y=${srcy}&range=${range}`,
      { matchID: matchID, effect: 'echo' },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function scream(matchID, direction, srcx, srcy, range) {
  return axios
    .patch(
      `/api/match/explosion/${direction}?x=${srcx}&y=${srcy}&range=${range}`,
      { matchID: matchID, effect: 'scream' },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

//TODO: rename
export function ninjaHealth(matchID) {
  return axios
    .patch(
      `/api/match/ninjas/${getUsername()}/health?damage=1`,
      { matchID: matchID },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function monsterHealth(matchID) {
  return axios
    .patch(
      `/api/match/monsters/${getUsername()}/health?damage=1`,
      { matchID: matchID },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function setMonsterChat(chatID, matchID) {
    console.log(chatID);
    return axios.patch( `/api/match/monsters/${getUsername()}/chat?id=${chatID}`, {matchID: matchID}, {withCredentials: true}).then((res) => {
        console.log(res.data);
        return res.data;
    })
}

export function getMonsterChat(user, matchID) {
    return axios.post( `/api/match/monsters/${user}/chat`, {matchID: matchID}, {withCredentials: true}).then((res) => {
        return res.data;
    })
}

export function setNinjaChat(chatID, matchID) {
    return axios.patch( `/api/match/ninjas/${getUsername()}/chat?id=${chatID}`, {matchID: matchID}, {withCredentials: true}).then((res) => {
        return res.data;
    })
}

export function getNinjaChat(user, matchID) {

    return axios.post( `/api/match/ninjas/${user}/chat`, {matchID: matchID}, {withCredentials: true}).then((res) => {
        return res.data;
    })
}

export function winPoints() {
    return axios
    .patch(
      `/api/users/${getUsername()}/win`,
      {},
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })

}

export function losePoints() {
    return axios
    .patch(
      `/api/users/${getUsername()}/lose`,
      {},
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}
/************************************************************
 *
 *  Rankings *
 *
 ************************************************************/

export function getUserStats(username) {
  return axios
    .get(`/api/users/${username}/stats`, { withCredentials: true })
    .then((res) => {
      return res.data
    })
}

export function getUserRanking(username) {
  return axios
    .get(`/api/rankings/${username}`, { withCredentials: true })
    .then((res) => {
      return res.data
    })
}

export function getLeaderboard(page = 0, limit = 10) {
  return axios
    .get(`/api/rankings/?page=${page}&limit=${limit}`, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data
    })
}

import axios from 'axios'

/************************************************************
 *
 *  Credentials *
 *
 ************************************************************/

export function login(username, password) {
  return axios
    .post(
      '/signin',
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
  return (window.location = 'http://localhost:5000/google')
}

export function signUp(username, password) {
  return axios
    .post(
      '/signup',
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
  return axios.get('/signout', { withCredentials: true }).then((res) => {
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

export function newPOV(matchID, x, y, radius) {
  return axios
    .post(
      `/match/source?x=${x}&y=${y}&radius=${radius}`,
      { matchID: matchID },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function getNinjas(matchID) {
  return axios
    .post(`/match/ninjas`, { matchID: matchID }, { withCredentials: true })
    .then((res) => {
      return res.data
    })
}

export function getMonsters(matchID) {
  return axios
    .post(`/match/monsters`, { matchID: matchID }, { withCredentials: true })
    .then((res) => {
      return res.data
    })
}

export function movePlayer(matchID, srcx, srcy, tarx, tary) {
  return axios
    .patch(
      `/match/move/${getUsername()}?srcx=${srcx}&srcy=${srcy}&tarx=${tarx}&tary=${tary}`,
      { matchID: matchID },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function shuriken(direction, srcx, srcy, range) {
  return axios
    .patch(
      `/match/shuriken/${direction}?x=${srcx}&y=${srcy}&range=${range}`,
      { matchID: '62e1d410c37b4b1ca2c89f54', effect: 'shuriken' },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function explosion(direction, srcx, srcy, range) {
  return axios
    .patch(
      `/match/explosion/${direction}?x=${srcx}&y=${srcy}&range=${range}`,
      { matchID: '62e1d410c37b4b1ca2c89f54', effect: 'bomb' },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function echo(direction, srcx, srcy, range) {
  return axios
    .patch(
      `/match/shuriken/${direction}?x=${srcx}&y=${srcy}&range=${range}`,
      { matchID: '62e1d410c37b4b1ca2c89f54', effect: 'echo' },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function scream(direction, srcx, srcy, range) {
  return axios
    .patch(
      `/match/explosion/${direction}?x=${srcx}&y=${srcy}&range=${range}`,
      { matchID: '62e1d410c37b4b1ca2c89f54', effect: 'scream' },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function ninjaHealth() {
  return axios
    .patch(
      `/match/ninjas/${getUsername()}/health?damage=1`,
      { matchID: '62e1d410c37b4b1ca2c89f54' },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data
    })
}

export function monsterHealth() {
  return axios
    .patch(
      `/match/monsters/${getUsername()}/health?damage=1`,
      { matchID: '62e1d410c37b4b1ca2c89f54' },
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

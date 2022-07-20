import axios from "axios";


export function login (username, password) {
    return axios.post("/signin", {
        displayName: username,
        password
    }, {withCredentials:true}).then((res) => {
        return res.data
    })
}

export function signUp (username, password) {
    return axios.post("/signup", {
        displayName: username,
        password
    }, {withCredentials:true}).then((res) => {
        return res.data
    })
}

export function signOut () {
    return axios.get("/signout", {withCredentials:true}).then((res) => {
        return res.data
    })
}

export function deleteAccount () {
    const username = getUsername()
    return axios.delete(`/api/users/${username}`, {withCredentials:true}).then((res) => {
        return res.data
    })
}

export function googleLogin () {
    return window.location = "http://localhost:5000/google"
}

export function getUsername () {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)displayName\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
}

export function newPOV (x, y, radius) {

    return axios.get(`/map/source?x=${x}&y=${y}&radius=${radius}`, {}, {withCredentials:true}).then((res) => {
        return res.data
    })
}

export function changePassword (password) {
    const username = getUsername()
    return axios.patch(`/api/users/${username}/password`, {
        password
    }, {withCredentials:true}).then((res) => {
        return res.data
    })
}

export function changeUsername (newUsername) {
    const username = getUsername()
    return axios.patch(`/api/users/${username}/username`, {
        username: newUsername
    }, {withCredentials:true}).then((res) => {
        return res.data
    })
}

// export function movePlayer (x, y, radius) {
    // return send("PATCH", `http://localhost:5000/match/move/player`);
// }

// export function movePlayer (x, y, radius) {
//     return {};
// }


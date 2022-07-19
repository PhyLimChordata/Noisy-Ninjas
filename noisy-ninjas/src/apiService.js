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
    console.log('bruh')
    return axios.get(`/google`, {withCredentials:true, headers: {"Access-Control-Allow-Origin": "http://localhost:5000"}}).then((res) => {
        return res.data
    })
}

export function getUsername () {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)displayName\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
}

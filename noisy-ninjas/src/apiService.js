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


export function googleLogin () {
    console.log('bruh')
    // return send("GET", `http://localhost:5000/google`);
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


// export function movePlayer (x, y, radius) {
    // return send("PATCH", `http://localhost:5000/match/move/player`);
// }

// export function movePlayer (x, y, radius) {
//     return {};
// }


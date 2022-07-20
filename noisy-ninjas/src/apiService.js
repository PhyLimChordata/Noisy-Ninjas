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
    return axios.get(`/google`, {withCredentials:true}).then((res) => {
        return res.data
    })
}

export function getUsername () {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)displayName\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
}

export function newPOV (x, y, radius) {
    console.log(x);
    console.log(y);
    return axios.post(`/match/source?x=${x}&y=${y}&radius=${radius}`, {matchID: "62d75dfb26ea56e6e3b2c898"}, {withCredentials:true}).then((res) => {
        return res.data
    });
}

export function getNinjas () {
    return axios.post(`/match/ninjas`, {matchID: "62d75dfb26ea56e6e3b2c898"},  {withCredentials:true}).then((res) => {
        console.log(res);
        return res.data
    });
}

export function movePlayer (srcx, srcy, tarx, tary) {

    console.log("MOVING");

    console.log("SRCX: " + srcx);
    console.log(srcy);
    console.log(tarx);
    console.log(tary);
    
    return axios.patch(`/match/move/${getUsername()}?srcx=${srcx}&srcy=${srcy}&tarx=${tarx}&tary=${tary}`, {matchID: "62d75dfb26ea56e6e3b2c898"}, {withCredentials:true}).then((res) => {
        console.log("OK");
        return res.data;
    });
}


export function shuriken (direction, srcx, srcy) {
    return axios.patch(`/match/shuriken/${direction}?x=${srcx}&y=${srcy}&range=3`, {matchID: "62d75dfb26ea56e6e3b2c898", effect: "shuriken"}, {withCredentials:true}).then((res) => {
        return res.data;
    });
}

export function explosion (direction, srcx, srcy) {
    return axios.patch(`/match/explosion/${direction}?x=${srcx}&y=${srcy}&range=3`, {matchID: "62d75dfb26ea56e6e3b2c898", effect: "bomb"}, {withCredentials:true}).then((res) => {
        return res.data; 
    });
}

export function ninjaHealth () {
    return axios.patch(`/match/ninjas/${getUsername()}/health?damage=1`, {matchID: "62d75dfb26ea56e6e3b2c898"}, {withCredentials:true}).then((res) => {
        return res.data;
    });
}
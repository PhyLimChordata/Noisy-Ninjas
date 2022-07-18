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

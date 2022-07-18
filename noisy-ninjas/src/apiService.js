function send(method, url, data) {
    const config = {
        method: method,
    };
    if (!["GET", "DELETE"].includes(method)) {
        config.headers = {
            "Content-Type": "application/json",
        };
        config.body = JSON.stringify(data);
    }

    return fetch(url, config).then((res) => {
        console.log(res.headers);

        if(res.ok) {
            return res.json()
        }
        return res.text().then(text => {throw new Error(text)})
    });
}

export function login (username, password) {
    return send("POST", `http://localhost:5000/signin/`, {
        displayName: username,
        password
    });
}

export function signUp (username, password) {
    return send("POST", `http://localhost:5000/signUp/`, {
        displayName: username,
        password
    });
}


export function googleLogin () {
    console.log('bruh')
    return send("GET", `http://localhost:5000/google`);
}

export function getUsername () {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)displayName\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
}

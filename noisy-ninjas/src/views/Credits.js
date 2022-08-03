import React from 'react'
import '../style/Credits.css'

export function Credits() {
    return (
        <div className={'credits-page'}>
            <div className={'header'}>
                CREDITS
            </div>
            <div className={'body'}>
                <h2>Front End</h2>
                <ul>
                    <li>
                        Heartbeat Sound from {" "}
                        <a className={"link"} href="https://mixkit.co/free-sound-effects/heartbeat/">
                            mixkit.co
                        </a>
                    </li>
                    <li>
                        Custom Font from {" "}
                        <a className={"link"} href="https://fontmeme.com/fonts/minecraft-font/">
                            fontmeme.com
                        </a>
                    </li>
                    <li>
                        All Artwork made by Andy Phy Lim on {" "}
                        <a className={"link"} href="https://www.figma.com/file/7wJWGyRVnMTbcITtFzIuTx/Noisy-Ninjas?node-id=0%3A1">
                            figma.com
                        </a>
                        {" "} (email Andy for access if needed)
                    </li>
                    <li>
                        Proximity Chat Inspired from {" "}
                        <a className={"link"} href="https://www.youtube.com/watch?v=5JTpRCo0e8s">
                            youtube.com
                        </a>
                        ,{" "}
                        <a className={"link"} href="https://peerjs.com/">
                            peerjs.com
                        </a>
                        , and {" "}
                        <a className={"link"} href="https://www.npmjs.com/package/peerjs">
                            npmjs.com
                        </a>
                    </li>

                </ul>
                <h2>Backend Code</h2>

                <ul>
                    <li>
                        Passport.js and Google Auth Code Inspired from {" "}
                        <a className={"link"} href="https://www.youtube.com/watch?v=o9e3ex-axzA">
                            youtube.com
                        </a>
                    </li>
                    <li>
                        Mongoose Code Inspired from {" "}
                        <a className={"link"} href="https://rahmanfadhil.com/express-rest-api/">
                            rahmanfadhil.com
                        </a>
                    </li>
                    <li>
                        Baseline Boilerplate Code Inspired from {" "}
                        <a className={"link"} href="https://github.com/choyiny/cscc09.com">
                            Lecture
                        </a>
                        {" "} and {" "}
                        <a className={"link"} href="https://github.com/orgs/UTSCC09/repositories">
                            Assignment
                        </a>
                    </li>
                    <li>
                        Cookie Code Inspired from {" "}
                        <a className={"link"} href="https://javascript.plainenglish.io/how-to-send-cookies-from-express-to-a-front-end-application-in-production-9273a4f3ce72">
                            javascript.plainenglish.io
                        </a>
                    </li>
                    <li>
                        CORS Code Inspired from {" "}
                        <a className={"link"} href="http://50linesofco.de/post/2017-03-06-cors-a-guided-tour">
                            50linesofco.de
                        </a>
                    </li>
                    <li>
                        Websocket Code Inspired from {" "}
                        <a className={"link"} href="https://blog.logrocket.com/websockets-tutorial-how-to-go-real-time-with-node-and-react-8e4693fbf843/">
                            blog.logrocket.com
                        </a>
                    </li>

                </ul>
                <h2>Deployment</h2>
                <ul>
                    <li>
                        Deployment Method Inspired from {" "}
                        <a className={"link"} href="https://medium.com/@rgoyard/how-to-deploy-a-single-page-application-and-its-backend-to-google-app-engine-353ff93bd38c">
                            medium.com
                        </a>
                        {" "} and {" "}
                        <a className={"link"} href="https://cloud.google.com/appengine/docs">
                            cloud.google.com
                        </a>
                    </li>
                </ul>
                <h2>Miscellaneous</h2>
                <ul>
                    <li>
                        Solved various problems on the application using {" "}
                        <a className={"link"} href="https://stackoverflow.com/">
                            stackoverflow.com
                        </a>
                    </li>
                    <li>
                        Created Endpoint Documentation using {" "}
                        <a className={"link"} href="https://medium.com/bb-tutorials-and-thoughts/how-to-add-swagger-to-nodejs-rest-api-7a542cfdc5e1">
                            Swagger
                        </a>
                    </li>
                </ul>

            </div>
        </div>
    )
}

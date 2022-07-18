import {Login} from "../views/Login";
import {SignUp} from "../views/SignUp";
import {Lobby} from "../views/Lobby";
import { GameScreen } from "../views/GameScreen";
import {Account} from "../views/Account";

const mainRoutes = [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/sign-up",
        element: <SignUp/>
    },
    {
        path: "/lobby",
        element: <Lobby/>
    },
    {
        path: "/game",
        element: <GameScreen/>
    },
    {
        path: "/account",
        element: <Account/>

    }

];

export default mainRoutes;

import {Login} from "../views/Login";
import {SignUp} from "../views/SignUp";
import {Lobby} from "../views/Lobby";
import { GameScreen } from "../views/GameScreen";
import {Account} from "../views/Account";
import {Leaderboard} from "../views/Leaderboard";

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
    },
    {
        path: "/leaderboard",
        element: <Leaderboard/>
    }

];

export default mainRoutes;

import {Login} from "../views/Login";
import {SignUp} from "../views/SignUp";
import { GameScreen } from "../views/GameScreen";

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
        path: "/game",
        element: <GameScreen/>
    }
];

export default mainRoutes;

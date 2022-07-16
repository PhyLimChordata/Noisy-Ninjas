import {Login} from "../views/Login";
import {SignUp} from "../views/SignUp";
import {Lobby} from "../views/Lobby";

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
    }
];

export default mainRoutes;

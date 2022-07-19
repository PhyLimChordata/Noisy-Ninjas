import {Login} from "../views/Login";
import {SignUp} from "../views/SignUp";
import {Lobby} from "../views/Lobby";
import { GameScreen } from "../views/GameScreen";
import {Account} from "../views/Account";
import {Leaderboard} from "../views/Leaderboard";
import {Navigate} from "react-router-dom";
import {getUsername} from "../apiService";

const username = getUsername()
const ProtectedRoute = ({children}) => {
    if (!username) {
        return <Navigate to="/" replace />;
    }
    return children;
};

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
        element: <ProtectedRoute> <Lobby/> </ProtectedRoute>
    },
    {
        path: "/game",
        element: <ProtectedRoute> <GameScreen/> </ProtectedRoute>
    },
    {
        path: "/account",
        element: <ProtectedRoute> <Account/> </ProtectedRoute>
    },
    {
        path: "/leaderboard",
        element: <ProtectedRoute> <Leaderboard/> </ProtectedRoute>
    }

];

export default mainRoutes;

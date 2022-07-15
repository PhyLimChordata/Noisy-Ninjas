import {Login} from "../views/Login";
import {SignUp} from "../views/SignUp";

const mainRoutes = [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/sign-up",
        element: <SignUp/>
    }
];

export default mainRoutes;

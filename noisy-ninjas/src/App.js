import { useRoutes } from "react-router-dom";

import routes from "./routes";
import "./App.css"
function App() {
    const routeResult = useRoutes(routes);
    return (
        <>
            {/*<header>*/}
            {/*    <strong>React Router v6</strong>*/}
            {/*    <nav>*/}
            {/*        <ul>*/}
            {/*            <li>*/}
            {/*                <Link to="/">Home</Link>*/}
            {/*            </li>*/}
            {/*            <li>*/}
            {/*            </li>*/}
            {/*        </ul>*/}
            {/*    </nav>*/}
            {/*</header>*/}

            <main>
                 {routeResult}
            </main>
        </>
    );
}

export default App;

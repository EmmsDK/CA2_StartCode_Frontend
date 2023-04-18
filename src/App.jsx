import React, {useState, useEffect} from "react"
import facade from "./apiFacade";
import LogIn from "./components/LoginForm";
import LoggedIn from "./components/LoggedIn";
import {NavLink} from "react-router-dom";


function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({username: "", roles: ""});

    const logout = () => {
        facade.logout();
        setLoggedIn(false);
        setUser({name: "", roles: ""})
    }
    const login = (user, pass) => {
        facade.login(user, pass).then(() => {
            const token = facade.readJwtToken(facade.getToken());
            setUser({username: token.username, roles: token.roles});
            setLoggedIn(true);
        });
    }

    return (
        <div>
            <ul className="header">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/logout">Logout</NavLink></li>
            </ul>
            <br/>
            {!loggedIn ? (<LogIn login={login}/>) :
                (<div>
                    <LoggedIn user={user}/>
                    <button onClick={logout}>Logout</button>
                </div>)}
        </div>
    )
}

const home = () => {
    return (
        <div>
            <h2>Home</h2>
        </div>
    )
}
const about = () => {
    return (
        <div>
            <h2>About</h2>
        </div>
    )
}
const logout = () => {
    return (
        <div>
            <h2>Logout</h2>
        </div>
    )
}

export default App

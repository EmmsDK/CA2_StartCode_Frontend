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

export default App

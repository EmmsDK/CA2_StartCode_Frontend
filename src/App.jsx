import React, {useState, useEffect} from "react"
import facade from "./apiFacade";
import LogIn from "./components/LoginForm";
import LoggedIn from "./components/LoggedIn";
import {NavLink, Route, Routes} from "react-router-dom";
import Joke from "./components/Joke.jsx";
import Fact from "./components/Fact.jsx";

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({username: "", roles: ""});

    const logout = () => {
        facade.logout();
        setLoggedIn(false);
        setUser({name: "", roles: ""})
        window.location.replace('/');
    }

    const login = (user, pass) => {
        facade.login(user, pass).then(() => {
            const token = facade.readJwtToken(facade.getToken());
            setUser({username: token.username, roles: token.roles});
            setLoggedIn(true);
        });
    }

    const Header = () => {
        return (
            <div>
                <ul className="header">
                    <li><NavLink to="/">Home</NavLink></li>
                    {loggedIn ? (
                        <li><NavLink to="/logout">Logout</NavLink></li>
                    ) : null}
                </ul>
                <br/>
            </div>
        )
    }

    const Home = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h2>Home</h2>
                        <h3></h3>
                        {!loggedIn ? (
                            <LogIn login={login}/>
                        ) : (
                            <div>
                                <h3>Here is the joke of the day:</h3>
                                <Joke/>
                                <h3>Here is the fact of the day:</h3>
                                <Fact/>
                                <LoggedIn user={user} logout={logout} loggedIn={loggedIn}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    const Logout = () => {
        return (
            <div>
                <h2>Logout</h2>
                <div>
                    <LoggedIn LoggedIn user={user} logout={logout} loggedIn={loggedIn}/>
                    <button onClick={logout}>Logout</button>
                </div>

            </div>
        )
    }

    return (
        <div>
            <Header/>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route path="/logout" element={<Logout/>}></Route>
            </Routes>
        </div>
    )
}

export default App
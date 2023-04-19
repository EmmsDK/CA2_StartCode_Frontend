import React, {useState, useEffect} from "react"
import facade from "./apiFacade";
import LogIn from "./components/LoginForm";
import LoggedIn from "./components/LoggedIn";
import {NavLink, Route, Routes} from "react-router-dom";

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

    useEffect(() => {
        const fetchJoke = async () => {
            try {
                const response = await fetch("/api/joke");
                if (!response.ok) {
                    throw new Error("Failed to fetch joke");
                }
                const data = await response.json();
                setJoke(data.joke);
                setError(null);
            } catch (error) {
                setError("Failed to fetch joke");
                setJoke(null);
            }
        };

        if (loggedIn) {
            fetchJoke();
        }
    }, [loggedIn]);


    const Header = () => {
        return (
            <div>
                <ul className="header">
                    <li><NavLink to="/">Home</NavLink></li>

                    <li><NavLink to="/logout">Logout</NavLink></li>
                </ul>
                <br/>

            </div>
        )
    }
    const Home = () => {
        const [joke, setJoke] = useState("");

        useEffect(() => {
            facade.fetchJokes().then((jokes) => {
                setJoke(jokes[0].joke);
            });
        }, []);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h2>Home</h2>
                        {!loggedIn ? (
                            <LogIn login={login}/>
                        ) : (
                            <div>
                                <LoggedIn user={user} logout={logout} loggedIn={loggedIn}/>

                                <div className="joke-container">
                                    <h3>Here is the joke of the day:</h3>
                                    <p>{joke}</p>
                                </div>
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

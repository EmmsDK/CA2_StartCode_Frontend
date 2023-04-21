import React from "react";
import {useState} from "react";
import {DTOUrl} from "../Setting.js";

const Joke = () => {
    const [joke, setJoke] = useState("");

    const fetchJoke = async (e) => {
        e.preventDefault();
        const response = await fetch(DTOUrl);
        const data = await response.json();
        setJoke(data.joke);
        console.log(response)
    }

    return (
        <div>
            <form onSubmit={fetchJoke}>
                <button type="submit">Get Joke</button>
            </form>
            <div className="joke-container">
                <p>{joke}</p>
            </div>
        </div>
    );
}

export default Joke;
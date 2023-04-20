import React from "react";
import {useState, useEffect} from "react";

const Joke = () => {
    const [joke, setJoke] = useState("");

    const fetchJoke = async () => {
        const response = await fetch("http://localhost:8080/ca2/api/apicall");
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
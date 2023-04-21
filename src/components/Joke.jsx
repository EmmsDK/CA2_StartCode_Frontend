import React, { useState, useEffect } from "react";
import { DTOUrl } from "../Setting.js";

const Joke = () => {
    const [joke, setJoke] = useState("");

    useEffect(() => {
        const fetchJoke = async () => {
            const response = await fetch(DTOUrl);
            const data = await response.json();
            setJoke(data.joke);
            console.log(response);
        };
        fetchJoke();

        const blurElement = document.getElementById("blurEffectJoke");
        if (blurElement) {
            blurElement.addEventListener("click", function () {
                blurElement.classList.remove("blur");
            });
        }
    }, []);

    return (
        <div>
            <div id="blurEffectJoke" className="joke-container blur">
                <p>{joke}</p>
            </div>
        </div>
    );
};

export default Joke;

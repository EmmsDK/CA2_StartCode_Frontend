import React, { useState, useEffect } from "react";
import {DTOUrl} from "../Setting.js";

const Fact = () => {
    const [fact, setFact] = useState("");

    useEffect(() => {
        const fetchFact = async () => {
            const response = await fetch(DTOUrl);
            const data = await response.json();
            setFact(data.fact);
            console.log(response);
        };
        fetchFact();

        const blurElement = document.getElementById("blurEffectFact");
        if (blurElement) {
            blurElement.addEventListener("click", function () {
                blurElement.classList.remove("blur");
            });
        }
    }, []);

    return (
        <div>
            <div id="blurEffectFact" className="fact-container blur">
                <p>{fact}</p>
            </div>
        </div>
    );
};

export default Fact;

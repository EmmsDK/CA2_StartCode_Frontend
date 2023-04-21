import React from "react";
import {useState} from "react";
import {DTOUrl} from "../Setting.js";

const Fact = () => {
    const [fact, setFact] = useState("");

    const fetchFact = async (e) => {
        e.preventDefault();
        const response = await fetch(DTOUrl);
        const data = await response.json();
        setFact(data.fact);
        console.log(response)
    }

    return (
        <div>
            <form onSubmit={fetchFact}>
                <button type="submit">Get Fact</button>
            </form>
            <div className="fact-container">
                <p>{fact}</p>
            </div>
        </div>
    );
}

export default Fact;
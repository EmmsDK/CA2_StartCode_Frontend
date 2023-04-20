import React from "react";
import {useState, useEffect} from "react";

const Fact = () => {
    const [fact, setFact] = useState("");

    const fetchFact = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/ca2/api/apicall");
        const data = await response.json();
        setFact(data.fact);
        console.log(response)
    }


    return (
        <div>
            <form onSubmit={fetchFact}>
                <button type="submit">Get Fact</button>
            </form>
            <div className="Jact-container">
                <p>{fact}</p>
            </div>
        </div>
    );
}

export default Fact;
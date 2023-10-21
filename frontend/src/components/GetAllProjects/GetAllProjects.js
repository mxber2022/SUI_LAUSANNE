import "./GetAllProjects.css";
import React, { useState } from 'react';

function GetAllProjects() {

    /*
        Get all the listed/minted Projects
    */
    async function getAllProjects() {
        
    }

    const [amount, setAmount] = useState('');

    const handleInputChange = (event) => {
        // Ensure only numbers are entered
        const value = event.target.value;
        if (!value || /^\d+$/.test(value)) {
        setAmount(value);
        }
    };

    return(
        <>
            <h2>Choose the project to fund</h2>
            <div>
            <label htmlFor="amount">Enter Amount:</label>
            <input
                type="text"
                id="amount"
                value={amount}
                onChange={handleInputChange}
                placeholder="Enter amount to fund"
            />
            </div>
            <button>Fund</button>
        </>
    )
}

export default GetAllProjects;
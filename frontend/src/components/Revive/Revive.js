import "./Revive.css";
import {useWallet} from '@suiet/wallet-kit';
import { useEffect } from "react";
import React, { useState } from 'react';

function Revive () {
    const wallet = useWallet();
    
    const [projectName, setProjectName] = useState('');
    const [github, setGithub] = useState('');
    const [founder, setFounder] = useState('');
    const [fundingAddress, setFundingAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission logic here
        console.log({ projectName, github, founder, fundingAddress });
      };

    useEffect(() => {
        if (!wallet.connected) return;
    }, 
    [wallet.connected])

    return(
        <>
    <p>List your project</p>
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Project Name:
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          GitHub:
          <input
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Founder:
          <input
            type="text"
            value={founder}
            onChange={(e) => setFounder(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Funding Address:
          <input
            type="text"
            value={fundingAddress}
            onChange={(e) => setFundingAddress(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
        </> 
    );
}

export default Revive;
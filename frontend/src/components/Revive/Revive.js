import "./Revive.css";
import {useWallet} from '@suiet/wallet-kit';
import { useEffect } from "react";
import React, { useState } from 'react';

function Revive () {
    const wallet = useWallet();
    
    const [projectName, setProjectName] = useState(''); // project name
    const [github, setGithub] = useState(''); // github address
    const [founder, setFounder] = useState(''); // founder name
    const [fundingAddress, setFundingAddress] = useState(''); // fund this address directly
    const [imageUrl, setImageUrl] = useState(''); // project image uri

    const handleSubmit = (e) => {
        e.preventDefault();
        /* 
            Handle the form submission logic here
            Mint the following project
        */ 
        console.log({ projectName, github, founder, fundingAddress, imageUrl});
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
      <div>
        <label>
          Image URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">List Project</button>
    </form>

        </> 
    );
}

export default Revive;
import "./Revive.css";
import { useEffect } from "react";
import React, { useState } from 'react';

import { TransactionBlock } from "@mysten/sui.js";
import config from '../../config.json';
import {useWallet} from '@suiet/wallet-kit';

function Revive () {
    const wallet = useWallet();
    
    const [projectName, setProjectName] = useState(''); // project name
    const [github, setGithub] = useState(''); // github address
    const [founder, setFounder] = useState(''); // founder name
    const [fundingAddress, setFundingAddress] = useState(''); // fund this address directly
    const [imageUrl, setImageUrl] = useState(''); // project image uri

    const handleSubmit = async (e) => {
        e.preventDefault();
        /* 
            Handle the form submission logic here
            Mint the following project
        */ 
        console.log({ projectName, github, founder, fundingAddress, imageUrl});
        mint()
      };

    
      function createMintNftTxnBlock() { 
        const tx = new TransactionBlock();

        tx.moveCall({
            target: `${config.CONTRACT_ADDRESS}::${config.CONTRACT_MODULE}::${config.CONTRACT_METHOD}`,
            arguments: [
                tx.pure(projectName),
                tx.pure(github),
                tx.pure(founder),
                tx.pure(fundingAddress),
                tx.pure(imageUrl),
            ],
        });
        console.log("TX: ", tx);

        return tx;
    }


    async function mint() {
        const txb = createMintNftTxnBlock();
        try {
            const res = await wallet.signAndExecuteTransactionBlock({
              transactionBlock: txb,
            });
            console.log("project successfully listed!", res);
          } catch (e) {
            console.error("listing failed", e);
          }
    }  

    useEffect(() => {
        if (!wallet.connected) return;
    }, 
    [wallet.connected])

    return(
        <>
<div className="reviveForm">
          <div className="reviveForm__container">
            <h2 className="reviveForm__title">List your project</h2>


  
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
          Image URL:
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
          External URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">List Project</button>
    </form>
    </div>
        </div> 

        </> 
    );
}

export default Revive;
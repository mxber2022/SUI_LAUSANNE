import "./GetAllProjects.css";
import React, { useState } from 'react';
import { Connection, Ed25519Keypair, JsonRpcProvider, RawSigner, TransactionBlock } from "@mysten/sui.js";
import { rpcClient } from "typed-rpc";
import config from '../../config.json';
import testImage from "./Assets/revive.png";
import {useWallet} from '@suiet/wallet-kit';
const GAS_BUDGET = 5000000;
const SPONSOR_RPC_URL = "https://api.shinami.com/gas/v1/sui_testnet_5cdc30f2b85b2611f3945a2ae400f71f";
const connection = new Connection({
    fullnode: 'https://api.shinami.com/node/v1/<NODE_ACCESS_KEY>'
});
const suiProvider = new JsonRpcProvider(connection);


function GetAllProjects() {
    const wallet = useWallet();
    /*
        Get all the listed/minted Projects
    */
    async function getAllProjects() {
        
    }

    const [amount, setAmount] = useState('');

    const handleInputChange = (event) => {
        event.preventDefault();
        // Ensure only numbers are entered
       
        transfer()
    };



    function createMintNftTxnBlock() { 
        const tx = new TransactionBlock();

        tx.moveCall({
            target: `${config.CONTRACT_ADDRESS}::${config.CONTRACT_MODULE}::${config.CONTRACT_METHOD_TRANSFER}`,
            arguments: [
                tx.pure("0x045ff181984b2bc837f2a740ffb5dc5f10730085e475ef98e5470dec279d5f6d"),
                tx.pure("0xdeae95ead0daa4a712345d8924e32026d03e8776c07f617f82d1faa1d8bc5081"),
                tx.pure("1"),
            ],
        });
        console.log("TX: ", tx);

        return tx;
    }


    async function transfer() {
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



    return(
        <>
            <div className="projects">
             {/* <div className="header__animation"></div> */}
            <div className="projects__container">
                <h2 className="projects__title">Choose the project to fund</h2>
                <div className="projects__content">
                    <div className="projects__img">
                        
                        <img src={testImage} alt=""/>
                    </div>
                    <div className="projects__form">
                        <div className="projects__inputs">

                        <p>Project Name: Ava</p>
                        <p>Github: https://github.com/mxber2022</p>
            <input
                type="text"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to fund"
                
            />
            
            </div>
            
            <button onClick={handleInputChange}>Fund</button>

            </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default GetAllProjects;
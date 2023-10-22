import "./GetAllProjects.css";
import React, { useState } from 'react';
import { Connection, Ed25519Keypair, JsonRpcProvider, RawSigner, TransactionBlock } from "@mysten/sui.js";
import { rpcClient } from "typed-rpc";
import config from '../../config.json';
import testImage from "./Assets/revive.png";
import {useWallet} from '@suiet/wallet-kit';


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





    const sponsorTransactionE2E = async() => {
        const GAS_BUDGET = 5000000;
    const SPONSOR_RPC_URL = "https://api.shinami.com/gas/v1/sui_testnet_53bc2755a0ab1939c18eff58ca113890";
    const connection = new Connection({
        fullnode: 'https://api.shinami.com/node/v1/sui_testnet_53bc2755a0ab1939c18eff58ca113890'
    });
    const suiProvider = new JsonRpcProvider(connection);
    const SENDER_ADDRESS = "0x269bb08cdd23d27502aedb3129214e086d78981c2e79a9e2aae0ab84a2975a66";
    const RECOVERY_PHRASE = "0xf8d897d377c0cbf3b29d8187d682180155915f435103a0f341c4350874ff80c5";

    // Or create it from the sender's recovery phrase
    const keyPair = Ed25519Keypair.deriveKeypair("parade ghost vocal off august infant machine jar bullet rocket spell brain");

    // Create a signer for the sender's keypair
    const signer = new RawSigner(keyPair, suiProvider);

        const gaslessTxb = createMintNftTxnBlock();
        const gaslessPayloadBytes = await gaslessTxb.build({ provider: suiProvider, onlyTransactionKind: true});
        
        


        
        const sponsor = rpcClient(SPONSOR_RPC_URL);
    // convert the byte array to a base64 encoded string
        const gaslessPayloadBase64 = btoa(
            gaslessPayloadBytes
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        // Send the gasless programmable payload to Shinami Gas Station for sponsorship, along with the sender and budget
        const sponsoredResponse = await sponsor.gas_sponsorTransactionBlock(gaslessPayloadBase64, SENDER_ADDRESS, GAS_BUDGET);

        // The transaction should be sponsored now, so its status will be "IN_FLIGHT"
        const sponsoredStatus = await sponsor.gas_getSponsoredTransactionBlockStatus(sponsoredResponse.txDigest);
        console.log("Sponsorship Status:", sponsoredStatus);
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

                        <p>Project Name: Revive</p>
                        <p>Github: https://github.com/mxber2022/SUI_LAUSANNE</p>
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
import "./Revive.css";
import {useWallet} from '@suiet/wallet-kit';
import { useEffect } from "react";

function Revive () {
    const wallet = useWallet();
    
    useEffect(() => {
        if (!wallet.connected) return;
        console.log('connected wallet name: ', wallet.name)
        console.log('account address: ', wallet.account?.address)
        console.log('account publicKey: ', wallet.account?.publicKey)
    }, 
    [wallet.connected])

    return(
        <>
            <p>List your project</p>
        </> 
    );
}

export default Revive;
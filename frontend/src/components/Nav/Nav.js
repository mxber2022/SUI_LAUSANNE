import "./Nav.css";
import {ConnectButton} from '@suiet/wallet-kit';
import {useWallet} from '@suiet/wallet-kit';
import { useEffect } from "react";

function Nav () {
    const wallet = useWallet();
    
    useEffect(() => {
        if (!wallet.connected) return;
        console.log('connected wallet name: ', wallet.name)
        console.log('account address: ', wallet.account?.address)
        console.log('account publicKey: ', wallet.account?.publicKey)
    }, 
    [wallet.connected])

    return(
        <nav className="nav">
            <div className="nav__container">
                <p className="nav__logo">REVIVE</p>
                <ConnectButton/>
            </div>
        </nav> 
    );
}

export default Nav;
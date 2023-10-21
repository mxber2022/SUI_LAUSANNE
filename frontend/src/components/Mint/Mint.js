import { TransactionBlock } from "@mysten/sui.js";
import "./Mint.css"
import config from '../../config.json';
import {useWallet} from '@suiet/wallet-kit';

function Mint() {

    const nftName = "testingfrontend";
    const nftDescription = "Hello I am testing";
    const nftImgUrl = "https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4";
    const wallet = useWallet();
    

    function createMintNftTxnBlock() { 
        const tx = new TransactionBlock();

        tx.moveCall({
            target: `${config.CONTRACT_ADDRESS}::${config.CONTRACT_MODULE}::${config.CONTRACT_METHOD}`,
            arguments: [
                tx.pure(nftName),
                tx.pure(nftDescription),
                tx.pure(nftImgUrl),
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
            console.log("nft minted successfully!", res);
            alert("Congrats! your nft is minted!");
          } catch (e) {
            alert("Oops, nft minting failed");
            console.error("nft mint failed", e);
          }
    }

    return(
        <>
         <button onClick={mint}>Mint Your NFT !</button>
        </>
    )
}

export default Mint;
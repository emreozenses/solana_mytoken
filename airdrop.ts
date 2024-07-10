import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js"
import wallet from "./wallet.json"

(async () =>{
    const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
    const connection = new Connection ("https://api.devnet.solana.com","confirmed");

    const txhash = await connection.requestAirdrop(keypair.publicKey,5*LAMPORTS_PER_SOL);

    console.log("https://explorer.solana.com/address/"+txhash+"?cluster=devnet");
})();
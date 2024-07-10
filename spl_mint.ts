import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import wallet from "./wallet.json"
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";

(async()=>{
    const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

    const connection = new Connection(
      'https://api.devnet.solana.com',
      'confirmed'
    );

    const token_decimals = 10_000;

    const mint = new PublicKey('4US2Yy2UD2ugzGvop7UJi56hJAqPtscdgBEka2sCDqAN');

    const ata = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        keypair.publicKey
    
    );
    console.log("ATA is: "+ata.address.toBase58());

    const mintTx = await mintTo(
        connection,
        keypair,
        mint,
        ata.address,
        keypair.publicKey,
        100*token_decimals

    );
    console.log("mintTx: "+mintTx);


})()
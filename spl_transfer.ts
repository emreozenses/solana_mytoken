import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import wallet from './wallet.json'
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token'

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))
const connection = new Connection('https://api.devnet.solana.com', 'confirmed')
const mint = new PublicKey('4US2Yy2UD2ugzGvop7UJi56hJAqPtscdgBEka2sCDqAN')
const transferTo = new PublicKey('Ez7J7utS9AH53r2JUFFhiUzetxUfUc5Nu9jJrHey8DDB');

(async()=>{
    const fromAta = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        keypair.publicKey
    );
    const toAta = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        transferTo
    );
    const tx = await transfer(
        connection,
        keypair,
        fromAta.address,
        toAta.address,
        keypair.publicKey,
        100000
    );
    console.log(tx);

})();
import { Connection, Keypair } from "@solana/web3.js"
import wallet from "./wallet.json"
import { createMint } from "@solana/spl-token";


(async()=>{
  const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))
  const connection = new Connection(
    'https://api.devnet.solana.com',
    'confirmed'
  )
  const mint = await createMint(connection, keypair, keypair.publicKey, null, 4)
  console.log('mint is: ' + mint) //4US2Yy2UD2ugzGvop7UJi56hJAqPtscdgBEka2sCDqAN
})();

import { Keypair } from "@solana/web3.js";

const kp = Keypair.generate();

console.log("my public key"+kp.publicKey.toBase58());
console.log("my secret key"+kp.secretKey);
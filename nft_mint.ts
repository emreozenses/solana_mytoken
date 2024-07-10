import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import wallet from './wallet.json'
import {
  createSignerFromKeypair,
  generateSigner,
  percentAmount,
  publicKey,
  signerIdentity,
} from '@metaplex-foundation/umi'
import { createNft, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import bs58 from "bs58"

const umi = createUmi('https://api.devnet.solana.com')
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet))

const signer = createSignerFromKeypair(umi, keypair)
umi.use(signerIdentity(signer))

umi.use(mplTokenMetadata());

const mint = generateSigner(umi);

(async()=>{
    const url =
      'https://arweave.net/bVNGS58RNkvt_IkQ0WHuEm2Ce_DmMv_hA-5BW2w7Vmw';

    const tx = createNft(umi,{
        mint,
        name:'moda evim',
        symbol:'ME',
        uri: url,
        sellerFeeBasisPoints: percentAmount(2)
    });

    const res = await tx.sendAndConfirm(umi);

    console.log(res.signature);
    console.log(bs58.encode(res.signature));
})();
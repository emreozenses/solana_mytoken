import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import wallet from './wallet.json'
import { createSignerFromKeypair, signerIdentity} from '@metaplex-foundation/umi'
import { createBundlrUploader } from '@metaplex-foundation/umi-uploader-bundlr'

const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));

const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(signer));

const uploader = createBundlrUploader(umi);

(async()=>{
    const imageUrl =
      'https://arweave.net/nYtIHGzpREH9eyc9Qia3RUvKW1n_2k6SOwbxTu1MmqA';
      const metadata = {
        name:'moda evim logo',
        symbol: 'ME',
        description: 'moda evim ecom website logo',
        image: imageUrl,
        attributes: [
            {trait_type: 'color', value: 'blue'},
            {trait_type: 'rarity', value: '2'}
        ],
        properties:{
            files:[
                {
                    type:'image/jpg',
                    url: imageUrl
                }
            ]
        }
      } 
      const myNewUrl = await uploader.uploadJson(metadata);
      console.log(myNewUrl);
})();

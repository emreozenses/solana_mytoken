import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import wallet from "./wallet.json"
import { createSignerFromKeypair, publicKey, signerIdentity } from "@metaplex-foundation/umi";
import { CreateMetadataAccountV3InstructionAccounts, CreateMetadataAccountV3InstructionArgs, DataV2Args, createMetadataAccountV3 } from "@metaplex-foundation/mpl-token-metadata";

(async()=>{
    const umi = createUmi("https://api.devnet.solana.com");
    const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
    const mint = publicKey('4US2Yy2UD2ugzGvop7UJi56hJAqPtscdgBEka2sCDqAN');

    const signer = createSignerFromKeypair(umi,keypair);
    umi.use(signerIdentity(signer));

    const accounts: CreateMetadataAccountV3InstructionAccounts ={
        mint,
        mintAuthority: signer 
    };
    const data: DataV2Args={
        name: "EOZNSS",
        symbol:"EOZ",
        uri:"https://arweave.net/1234",
        sellerFeeBasisPoints:200,
        creators:null,
        collection:null,
        uses:null
    }
    const args: CreateMetadataAccountV3InstructionArgs = {
        data,
        collectionDetails: null,
        isMutable: true

    };

    const tx = createMetadataAccountV3(umi,{
        ...accounts,
        ...args
    })

    await tx.sendAndConfirm(umi).then((res)=>{
        console.log(res.signature.toString());
    });

})();
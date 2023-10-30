import { GnfdClient } from "@/config/client";
import { Client } from '@bnb-chain/greenfield-js-sdk';
import { Stat } from 'isomorphic-git';

const GREEN_CHAIN_ID = '5600'
const GRPC_URL= 'https://gnfd-testnet-fullnode-tendermint-ap.bnbchain.org'

type EncodingOpts = {
    encoding?: "utf8";
};
class GnfdBackend {
    private client: any;
    private bucketName: string;
    private privateKey: string;

    constructor(bucketName : string, privateKey: string) {
        this.client = Client.create(GRPC_URL, GREEN_CHAIN_ID);
        this.bucketName = bucketName
        this.privateKey = privateKey
    }

    public async readFile(
      filepath: string,
      opts: EncodingOpts | string
    ): Promise<string | Uint8Array> {
      console.log('readFile filepath', filepath)

      const res = await GnfdClient.object.getObject({
          bucketName: this.bucketName,
          objectName: filepath.slice(1),
      }, {
          type: 'ECDSA',
          privateKey: this.privateKey
      })

      if (!res.body) return '';

      let resText = await res.body?.text()
      return resText.replace('\n', '');
    }

    async writeFile(
        filepath: string,
        data: Uint8Array | string,
    ): Promise<void> {}

    async unlink(filepath: string): Promise<void> {
    }

    async stat(filepath: string): Promise<Stat>{
      try {
        const res = await GnfdClient.object.headObject(this.bucketName, filepath.slice(1))
      
        if (res) {
          return {
            // @ts-ignore
            type: 'file',
            size: res.objectInfo.payloadSize.toNumber()
          }
        }
      } catch (err) {
        // ...
      }

      return {
        // @ts-ignore
        type: '',
        size: 0
      }
    }
}
export default GnfdBackend;
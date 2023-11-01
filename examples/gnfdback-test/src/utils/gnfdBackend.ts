import { GnfdClient } from "@/config/client";
import { Client, isValidObjectName } from '@bnb-chain/greenfield-js-sdk';
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
        let objectName: string;
        let type: string = '';
        if (filepath.startsWith("/objects/")) {
            const temp = filepath.slice(1);
            const str = temp.split("/");
            const typeObject = `types/${str[1]}${str[2]}`;

            const res = await GnfdClient.object.getObject({
                bucketName: this.bucketName,
                objectName: typeObject,
            }, {
                type: 'ECDSA',
                privateKey: this.privateKey
            })
            if (!res.body) return ''
            let resText = await res.body?.text()
            type = resText.replace('\n', '')
            console.log('read object type', type)
            objectName = `objects/` + type + `/${str[1]}${str[2]}`;
        } else if (filepath.startsWith("/packed-refs")){
            return ''
        } else {
            objectName = filepath.slice(1)
        }

        console.log('get object', objectName)
        const res = await GnfdClient.object.getObject({
            bucketName: this.bucketName,
            objectName: objectName,
        }, {
            type: 'ECDSA',
            privateKey: this.privateKey
        })

        if (!res.body) return '';
        if (filepath.startsWith("/objects/")) {
            let content =  new Uint8Array(await res.body.arrayBuffer())
            let length = content.byteLength
            let ret = new Uint8Array(Buffer.from(`${type} ${length}\x00`))
            return new Uint8Array([...ret, ...content])
        } else {
            let resText = await res.body?.text()
            if (resText.endsWith('\n')) {
                return resText.slice(0, -1)
            } else {
                return resText
            }
        }
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
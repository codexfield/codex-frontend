import { GnfdClient } from "@/config/client";
import { SpResponse } from '@bnb-chain/greenfield-js-sdk';
import { Stat } from 'isomorphic-git';
import localforage from 'localforage';

type EncodingOpts = {
    encoding?: "utf8";
};

export default class GnfdBackend {
    private repoName: string;
    private privateKey: string;
    private endpoint: string;
    private forageInstance: LocalForage;

    constructor(repoName : string, privateKey: string, endpoint: string) {
        this.repoName = repoName
        this.privateKey = privateKey
        this.endpoint = endpoint

        this.forageInstance = localforage.createInstance({
          name: 'codex',
          storeName: repoName,
        })
    }

    private async readGnfdObject(objectName: string) {
      console.log('onGnfdObject', objectName)
      let res: SpResponse<Blob>;

      const cacheObjectRes = await this.forageInstance.getItem(objectName) as SpResponse<Blob>;

      console.log('cacheObjectRes', cacheObjectRes)

      if (cacheObjectRes) {
        res = cacheObjectRes;
      } else {
        res = await GnfdClient.object.getObject({
          bucketName: this.repoName,
          objectName,
          endpoint: this.endpoint,
        }, {
            type: 'ECDSA',
            privateKey: this.privateKey
        })
        console.log('repo', this.repoName, objectName, res)

        await this.forageInstance.setItem(objectName, res)
      }

      return res;
    }

    public async readFile(
      filepath: string,
      opts: EncodingOpts | string
    ): Promise<string | Uint8Array> {
        let objectName: string;
        let type: string = '';
        if (filepath.startsWith("/objects/")) {
            const temp = filepath.slice(1);
            const str = temp.split("/");
            objectName = `objects/${str[1]}${str[2]}`;
        } else if (filepath.startsWith("/packed-refs")){
            // this.forageInstance.setItem(filepath, '')
            return ''
        } else {
            objectName = filepath.slice(1)
        }

        // console.log('get object', filepath, objectName)

        const res = await this.readGnfdObject(objectName)
        
        if (!res.body) return '';
        if (filepath.startsWith("/objects/")) {
            return new Uint8Array(await res.body.arrayBuffer())
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
        let res: Awaited<ReturnType<typeof GnfdClient.object.headObject>>;

        const cacheHeadObjRes = await this.forageInstance.getItem(filepath) as Awaited<ReturnType<typeof GnfdClient.object.headObject>>

        if (cacheHeadObjRes) {
          res = cacheHeadObjRes
        } else {
          res = await GnfdClient.object.headObject(this.repoName, filepath.slice(1))
        }
      
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
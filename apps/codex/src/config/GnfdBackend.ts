import { GreenfieldClient } from '@/config/GnfsClient';
import { SpResponse } from '@bnb-chain/greenfield-js-sdk';
import { Stat } from '@codexfield/isomorphic-git';
import { ReedSolomon } from '@bnb-chain/reed-solomon';
import localforage from 'localforage';

class FileNotFoundError extends Error {
  code: string;

  constructor(message: string) {
    super(message);
    this.name = 'FileNotFoundError';
    this.code = 'ENOENT';
    Object.setPrototypeOf(this, FileNotFoundError.prototype);
  }
}

type EncodingOpts = {
  encoding?: 'utf8';
};

export default class GnfdBackend {
  private repoName: string;
  private endpoint: string;
  private seed: string;
  private address: string;
  private forageInstance: LocalForage;
  private cache = false;

  constructor(repoName: string, seed: string, endpoint: string, address: string) {
    this.repoName = repoName;
    this.endpoint = endpoint;
    this.seed = seed;
    this.address = address;

    this.forageInstance = localforage.createInstance({
      name: 'codex',
      storeName: repoName,
    });
  }

  private async saveSuperblock() {}

  private async readGnfdObject(objectName: string) {
    // console.log('onGnfdObject', objectName);
    let res: SpResponse<Blob>;

    const cacheObjectRes = (await this.forageInstance.getItem(objectName)) as SpResponse<Blob>;

    // console.log('cacheObjectRes', cacheObjectRes);

    if (cacheObjectRes && this.cache) {
      res = cacheObjectRes;
    } else {
      // console.log('xxx', this.seed, this.address, this.repoName, objectName, this.endpoint);
      res = await GreenfieldClient.object.getObject(
        {
          bucketName: this.repoName,
          objectName,
          endpoint: this.endpoint,
        },
        {
          type: 'EDDSA',
          domain: window.location.origin,
          seed: this.seed,
          address: this.address,
        },
      );
      // console.log('repo', this.repoName, objectName, res);

      if (this.cache) {
        await this.forageInstance.setItem(objectName, res);
      }
    }

    return res;
  }

  public async readFile(
    filepath: string,
    opts: EncodingOpts | string,
  ): Promise<string | Uint8Array> {
    let objectName: string;
    const type: string = '';
    if (filepath.startsWith('/objects/')) {
      const temp = filepath.slice(1);
      const str = temp.split('/');
      objectName = `objects/${str[1]}${str[2]}`;
    } else if (filepath.startsWith('/packed-refs')) {
      // this.forageInstance.setItem(filepath, '')
      return '';
    } else {
      objectName = filepath.slice(1);
    }

    // console.log('get object', filepath, objectName)

    const res = await this.readGnfdObject(objectName);

    if (!res.body) return '';
    if (filepath.startsWith('/objects/')) {
      return new Uint8Array(await res.body.arrayBuffer());
    } else {
      const resText = await res.body?.text();
      if (resText.endsWith('\n')) {
        return resText.slice(0, -1);
      } else {
        return resText;
      }
    }
  }

  private async convertToUint8Array(data: Uint8Array | string): Promise<Uint8Array> {
    if (typeof data === 'string') {
      return new TextEncoder().encode(data);
    } else {
      return data;
    }
  }

  private async writeGnfdObject(objectName: string, data: Uint8Array | string) {
    // console.log('onWriteObject', objectName)
    // let hashResult = {} as any
    let checksums: string[] = [];
    const d = await this.convertToUint8Array(data);

    try {
      const rs = new ReedSolomon();
      checksums = rs.encode(d);
      // hashResult = await (window as any).FileHandle.getCheckSums(
      //   await this.convertToUint8Array(data)
      // );
    } catch (e) {
      // console.error(e)
    }

    // console.log('checksums', checksums);

    // const { contentLength, expectCheckSums } = hashResult;
    const createObjectTx = await GreenfieldClient.object.createObject(
      {
        bucketName: this.repoName,
        objectName: objectName,
        creator: this.address,
        visibility: 'VISIBILITY_TYPE_PRIVATE',
        fileType: 'application/octet-stream',
        redundancyType: 'REDUNDANCY_EC_TYPE',
        contentLength: d.length,
        expectCheckSums: checksums,
      },
      {
        type: 'EDDSA',
        domain: window.location.origin,
        seed: this.seed,
        address: this.address,
      },
    );

    const simulateInfo = await createObjectTx.simulate({
      denom: 'BNB',
    });

    // console.log('simulateInfo', simulateInfo);

    const res = await createObjectTx.broadcast({
      denom: 'BNB',
      gasLimit: Number(simulateInfo?.gasLimit),
      gasPrice: simulateInfo?.gasPrice || '5000000000',
      payer: this.address,
      granter: '',
    });

    // if (res.code === 0) {
    //   console.log('createObject tx success');
    // } else {
    //   console.log('create object failed.', res);
    // }

    await this.delay(5000);

    // console.log('data:', data);
    const blob = new Blob([data], { type: 'text/plain' });
    const file = new File([blob], 'foo.txt', { type: 'text/plain' });
    const uploadRes = await GreenfieldClient.object.uploadObject(
      {
        bucketName: this.repoName,
        objectName: objectName,
        body: file,
        txnHash: res.transactionHash,
      },
      {
        type: 'EDDSA',
        domain: window.location.origin,
        seed: this.seed,
        address: this.address,
      },
    );
    // console.log('uploadRes', uploadRes);

    return res;
  }

  async delay(time: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(0);
      }, time);
    });
  }

  async writeFile(filepath: string, data: Uint8Array | string): Promise<void> {
    let objectName: string;
    if (filepath.startsWith('/objects/')) {
      const temp = filepath.slice(1);
      const str = temp.split('/');
      objectName = `objects/${str[1]}${str[2]}`;
    } else if (filepath.startsWith('/packed-refs')) {
      return;
    } else if (filepath.startsWith('/config')) {
      return;
    } else if (filepath.startsWith('/HEAD') || filepath.startsWith('/refs/')) {
      objectName = `refs` + filepath;
    } else {
      objectName = filepath.slice(1);
    }

    await this.writeGnfdObject(objectName, data);
    // const res = await this.writeGnfdObject(objectName, data);
    // console.log('writeFile res', res);
    // return res;
  }

  async unlink(filepath: string): Promise<void> {}

  async stat(filepath: string): Promise<Stat> {
    try {
      let res: Awaited<ReturnType<typeof GreenfieldClient.object.headObject>>;

      const cacheHeadObjRes = (await this.forageInstance.getItem(filepath)) as Awaited<
        ReturnType<typeof GreenfieldClient.object.headObject>
      >;

      if (cacheHeadObjRes && this.cache) {
        res = cacheHeadObjRes;
      } else {
        res = await GreenfieldClient.object.headObject(this.repoName, filepath.slice(1));
      }

      if (res) {
        return {
          // @ts-ignore
          type: 'file',
          size: res.objectInfo.payloadSize.toNumber(),
        };
      }
    } catch (err) {
      // ...
    }
    throw new FileNotFoundError('File not found');
  }
}

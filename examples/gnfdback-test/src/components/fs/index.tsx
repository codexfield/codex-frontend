import git from 'isomorphic-git'
import http from 'isomorphic-git/http/web/index.js'
import LightningFS from '@isomorphic-git/lightning-fs'
import { getBranch, getObject } from '@/utils/gnfd';
import { useState } from 'react';
import {useAccount} from 'wagmi'
import GnfdBackend from '@/utils/gnfdBackend';
import { GnfdClient } from '@/config/client';
import localforage from 'localforage';

export const FsComponent = () => {
  const { address, connector } = useAccount();
  const [bucketName, setBucketName] = useState<string>('')
  const [privateKey, setPrivateKey] = useState('')

  return <>
    bucketName: <input value={bucketName} onChange={(e) => {
      setBucketName(e.target.value)
    }} />
    <br/>

    private key<input value={privateKey} onChange={(e) => {
      setPrivateKey(e.target.value)
    }} />
    <br />
    
    <button onClick={async () => {
      
      // const forageInstance = localforage.createInstance({
      //   name: 'codex',
      //   storeName: bucketName,
      // })

      // forageInstance.setItem('x', 'xxx1')

      // return;
      // const res2 = await GnfdClient.object.headObject('test-repo', '/packed-refs')
      // console.log('res', res2)

      // return
      const backend = new GnfdBackend(bucketName, privateKey)
      // use custom fs
      // debugger;
      const fs = new LightningFS("fs", {
        // @ts-ignore
        backend,
      })

      const res = await git.resolveRef({
        fs: fs,
        dir: "",
        gitdir: '',
        ref: "HEAD",
      })
      console.log("example ref", res)

      const commit = await git.readCommit({
        fs: fs,
        dir: "",
        gitdir: "",
        oid: res
      })
      console.log("example commit", commit.commit.tree)

      // const tree = await git.readTree({
      //   fs: fs,
      //   dir: "",
      //   gitdir: "",
      //   oid: 'eeb12140d333f157a4dff3cb286f03a98cbfd5e1'
      // })
      

      const tree = await git.readTree({
        fs: fs,
        dir: "",
        gitdir: "",
        oid: commit.commit.tree
      })
      console.log("example tree", tree)

      // const file = await git.readBlob({
      //   fs: fs,
      //   dir: "",
      //   gitdir: "",
      //   oid: tree.tree[0].oid
      // })
      // const decoder = new TextDecoder();
      // console.log("example file", decoder.decode(file.blob))
      return;

      // use default fs
      // const fs = new LightningFS("fs")

      // const provider = await connector?.getProvider();
      // const offChainData = await getOffchainAuthKeys(address, provider);
      // if (!offChainData) {
      //   alert('No offchain, please create offchain pairs first');
      //   return;
      // }

      // bucketName: 'test-repo'
      // privateKey: 0x6547492644d0136f76ef65e3bd04a77d079ed38028f747700c6c6063564d7032

      // let commitOid = await git.resolveRef({ fs, dir: '/', ref: 'main' })
      // console.log(commitOid)

      // // 1. get branch
      // const ref = await getObject({
      //   bucketName,
      //   objectName: 'refs/HEAD',
      //   privateKey,
      // })
      // const branch = getBranch(ref!)
      // console.log('branch', branch)
      //
      // // 2. get commit hash
      // const commitHash = await getObject({
      //   bucketName,
      //   objectName: `refs/refs/heads/${branch}`,
      //   privateKey,
      // })
      //
      // console.log('commit hash', commitHash)
      //
      // // 3. types (commit | tree | blob)
      // const types = await getObject({
      //   bucketName,
      //   objectName: `types/${commitHash}`,
      //   privateKey,
      // })
      //
      // console.log('types', types)
      //
      // // 4. from objects commit hash -> content  | readFile('objects/${commit id}')
      //
      // const obj = await getObject({
      //   bucketName,
      //   objectName: `objects/commit/${commitHash}`,
      //   privateKey,
      // })
      // console.log('obj', obj)

      // const dir = '/doc-site'

      // await git.clone({
      //   fs,
      //   http,
      //   dir: '/folders',
      //   // url: 'https://github.com/rks118/test-repo',
      //   url: 'https://github.com/bnb-chain/greenfield-js-sdk',
      //   corsProxy: "https://cors.isomorphic-git.org"
      // })
      //
      // // debugger
      // const res = await git.resolveRef({
      //   fs,
      //   dir: '/folders',
      //   ref: 'HEAD',
      // })
      // console.log('res', res)
      //
      // const commit = await git.readCommit({
      //   fs,
      //   dir: '/folders',
      //   oid: res
      // })
      // console.log('res', commit)

      /**
       * input:
       * gnfd://gnfd-testnet-fullnode-tendermint-us.bnbchain.org:443/${bucket_name}
       * 
       * output:
       * tree
       */

      /**
       * 1. refs/HEAD -> current branch : `refs/heads/main` -> main
       * 2. refs/heads/main -> hash (06583e5e88dff02041ed969a71378c24287ab1b0)
       * 3. objects/commit find `06583e5e88dff02041ed969a71378c24287ab1b0`
       * 
       * 
       * 
       * 4. git ls-tree `06583e5e88dff02041ed969a71378c24287ab1b0`
       *  ```
       *  100644 blob 69f4ce1defb00face7ea33a1032ee8956cc200ea	README.md
          040000 tree eeb12140d333f157a4dff3cb286f03a98cbfd5e1	folders
          ```
       `
       */

      // await git.resolveRef({
      //   fs,

      // })
      // await git.clone({
      //   fs,
      //   http,
      //   dir,
      //   url: 'https://github.com/bnb-chain/greenfield-js-sdk',
      //   corsProxy: "https://cors.isomorphic-git.org"
      // })

      // const res = await git.readTree({
      //   fs,
      //   dir,
      //   oid: '3475a7467a5d7d3a72db8ca5c8bb60cca2e4e27d',
      // })
      
      // console.log('res', res)
    }}>test </button>

    {/* <button onClick={async () => {
      // const fs = new LightningFS("fs")
      // await git.clone({
      //   fs,
      //   http,
      //   dir,
      //   url: 'https://github.com/bnb-chain/greenfield-js-sdk',
      //   corsProxy: "https://cors.isomorphic-git.org"
      // })
      // const res = await git.readTree({
      //   fs,
      //   dir,
      //   oid: '3475a7467a5d7d3a72db8ca5c8bb60cca2e4e27d',
      // })
      
      // console.log('res', res)
    }}>
      test readFile
    </button> */}
  </>
}

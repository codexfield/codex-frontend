import git from 'isomorphic-git'
import http from 'isomorphic-git/http/web/index.js'
import LightningFS from '@isomorphic-git/lightning-fs'
import {Client} from '@bnb-chain/greenfield-js-sdk'

const GnfdClient = Client.create("https://gnfd.qa.bnbchain.world", String(9000))

class GnfdFs {
  async stat() {
    console.log('stat')
  }
}

export const FsComponent = () => {
  return <>
    <button onClick={async () => {
      
      // use custom fs
      // const fs = new LightningFS("fs", {
      //   backend: new GnfdFs(),
      // })

      // use default fs
      const fs = new LightningFS("fs")

      // get obj list
      const objs = await GnfdClient.object.listObjects({
        bucketName: 'test-repo',
        endpoint: 'https://gnfd-testnet-sp1.nodereal.io'
      })
      console.log('objs', objs)

      // const dir = '/doc-site'
      // git.resolveRef()

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
    }}>test readTree</button>

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

      /* 
      BrowserFS.configure({
        fs: "IndexedDB",
        options: {},
      }, async (err) => {
        // if (err) return console.log(err);
        // const fs = BrowserFS.BFSRequire("fs");
        // const files = await git.listFiles({ fs, dir: '/doc-site' });
        // console.log(files);

        await git.clone({
          fs,
          http,
          dir,
          url: 'https://github.com/bnb-chain/greenfield-js-sdk',
          corsProxy: "https://cors.isomorphic-git.org"
        })

        const res = await git.readTree({
          fs,
          dir,
          oid: '3475a7467a5d7d3a72db8ca5c8bb60cca2e4e27d',
        })
      }); */
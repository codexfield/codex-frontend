import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      <script async src="https://unpkg.com/@bnb-chain/greenfiled-file-handle@1.0.0/dist/browser/umd/index.js"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__PUBLIC_FILE_HANDLE_WASM_PATH__ = 'https://unpkg.com/@bnb-chain/greenfiled-file-handle@1.0.0/dist/node/file-handle.wasm'`,
        }}
      ></script>
    </Html>
  )
}

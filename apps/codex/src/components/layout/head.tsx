import Head from 'next/head';

export const DocumentHead = () => {
  return (
    <Head>
      <title>CodexField</title>
      <meta property='og:title' content='CodeX' key='title' />
      <link rel='shortcut icon' href='/favicon.png' />
      <link rel='icon' color='#000000' href='/favicon.png' />
    </Head>
  );
};

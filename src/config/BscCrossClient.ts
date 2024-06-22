import {
  CrossChainClient,
  MultiMessageClient,
  BasicClientParams,
} from '@bnb-chain/bsc-cross-greenfield-sdk';

export const getCrossClientConfig = (address: `0x${string}`) => {
  const config: BasicClientParams = {
    chainConfig: 'testnet',
    accountConfig: {
      address,
      ethereumProvider: window.ethereum,
    },
  };

  return config;
};

// export const crossChainClient = new CrossChainClient(config, CROSSCHAIN_ADDRESS);

import { bscTestnet, bsc } from 'wagmi/chains';

export const ENV = process.env.NEXT_PUBLIC_ENV as 'TESTNET' | 'MAINNET';

export const GNFD_CHAINID = parseInt(process.env.NEXT_PUBLIC_GNFD_CHAINID || '5600');
export const GNFD_RPC =
  process.env.NEXT_PUBLIC_GNFD_RPC || 'https://gnfd-testnet-fullnode-tendermint-ap.bnbchain.org';
export const GNFD_SCAN_URL = process.env.NEXT_PUBLIC_GNFD_SCAN_URL || '';

export const BSC_CHAIN = ENV === 'TESTNET' ? bscTestnet : bsc;

export const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  '0xae5c57a7285602830aEA302f56e8Cf647a82F022') as `0x{string}`;

export const MARTET_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS ||
  '0x077299B747Cb9da17AC6F7f2c509B9488d831564') as `0x{string}`;

export const WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';

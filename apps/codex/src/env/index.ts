import { bscTestnet, bsc } from 'wagmi/chains';

export const ENV = process.env.NEXT_PUBLIC_ENV as 'TESTNET' | 'MAINNET';

export const GNFD_CHAINID = parseInt(process.env.NEXT_PUBLIC_GNFD_CHAINID || '5600');
export const GNFD_RPC =
  process.env.NEXT_PUBLIC_GNFD_RPC || 'https://gnfd-testnet-fullnode-tendermint-ap.bnbchain.org';
export const GNFD_SCAN_URL = process.env.NEXT_PUBLIC_GNFD_SCAN_URL || '';

export const BSC_CHAIN = ENV === 'TESTNET' ? bscTestnet : bsc;

export const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  '0xae5c57a7285602830aEA302f56e8Cf647a82F022') as `0x{string}`;

export const CROSS_CHAIN_ADDRESS = (process.env.NEXT_PUBLIC_CROSS_CHAIN_ADDRESS ||
  '0xa5B2c9194131A4E0BFaCbF9E5D6722c873159cb7') as `0x{string}`;

export const BUCKET_HUB_ADDRESS = (process.env.NEXT_PUBLIC_BUCKET_HUB_ADDRESS ||
  '0x5BB17A87D03620b313C39C24029C94cB5714814A') as `0x{string}`;

export const PERMISSION_HUB_ADDRESS = (process.env.NEXT_PUBLIC_PERMISSION_HUB_ADDRESS ||
  '0x25E1eeDb5CaBf288210B132321FBB2d90b4174ad') as `0x{string}`;

export const WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';

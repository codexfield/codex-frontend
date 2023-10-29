import { Client } from '@bnb-chain/greenfield-js-sdk';

const GREEN_CHAIN_ID = '5600'
const GRPC_URL= 'https://gnfd-testnet-fullnode-tendermint-ap.bnbchain.org'

export const GnfdClient = Client.create(GRPC_URL, String(GREEN_CHAIN_ID));
export const CROSS_CHAIN_ABI = [
  {
    type: 'function',
    name: 'callbackGasPrice',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getRelayFees',
    inputs: [],
    outputs: [
      {
        name: 'relayFee',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'minAckRelayFee',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'sendSynPackage',
    inputs: [
      {
        name: 'channelId',
        type: 'uint8',
        internalType: 'uint8',
      },
      {
        name: 'msgBytes',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'relayFee',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'ackRelayFee',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

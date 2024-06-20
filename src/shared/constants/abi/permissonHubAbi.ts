export const PermissionHubAbi = [
  {
    type: 'function',
    name: 'createPolicy',
    inputs: [
      {
        name: '_data',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'createPolicy',
    inputs: [
      {
        name: '_data',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: '_extraData',
        type: 'tuple',
        internalType: 'struct CmnStorage.ExtraData',
        components: [
          {
            name: 'appAddress',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'refundAddress',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'failureHandleStrategy',
            type: 'uint8',
            internalType: 'enum PackageQueue.FailureHandleStrategy',
          },
          {
            name: 'callbackData',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'deletePolicy',
    inputs: [
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_extraData',
        type: 'tuple',
        internalType: 'struct CmnStorage.ExtraData',
        components: [
          {
            name: 'appAddress',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'refundAddress',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'failureHandleStrategy',
            type: 'uint8',
            internalType: 'enum PackageQueue.FailureHandleStrategy',
          },
          {
            name: 'callbackData',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'deletePolicy',
    inputs: [
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'payable',
  },
] as const;

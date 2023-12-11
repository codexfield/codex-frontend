export const ABI = [
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_targetAddrs',
        type: 'address[]',
      },
    ],
    name: 'batchFollow',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_targetAddrs',
        type: 'address[]',
      },
    ],
    name: 'batchUnfollow',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_avatar',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_bio',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_company',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_location',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_website',
        type: 'string',
      },
      {
        internalType: 'string[]',
        name: '_socialAccounts',
        type: 'string[]',
      },
    ],
    name: 'editAccount',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_targetAddr',
        type: 'address',
      },
    ],
    name: 'follow',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
    ],
    name: 'getAccountDetails',
    outputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_avatar',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_bio',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_company',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_location',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_website',
        type: 'string',
      },
      {
        internalType: 'string[]',
        name: '_socialAccounts',
        type: 'string[]',
      },
      {
        internalType: 'uint256',
        name: '_followingNumber',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_followerNumber',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
    ],
    name: 'getAccountId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
    ],
    name: 'getAccountName',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: '_ids',
        type: 'uint256[]',
      },
    ],
    name: 'getBatchAccountById',
    outputs: [
      {
        internalType: 'address[]',
        name: '_accounts',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_accounts',
        type: 'address[]',
      },
    ],
    name: 'getBatchAccountName',
    outputs: [
      {
        internalType: 'string[]',
        name: '_names',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'limit',
        type: 'uint256',
      },
    ],
    name: 'getFollower',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '_ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: '_totalLength',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'limit',
        type: 'uint256',
      },
    ],
    name: 'getFollowing',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '_ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: '_totalLength',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_avatar',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_bio',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_company',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_location',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_website',
        type: 'string',
      },
      {
        internalType: 'string[]',
        name: '_socialAccounts',
        type: 'string[]',
      },
    ],
    name: 'register',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_targetAddr',
        type: 'address',
      },
    ],
    name: 'unfollow',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export const ACCOUNT_MANAGE_ABI = [
  {
    type: 'function',
    name: 'batchFollow',
    inputs: [
      {
        name: '_targetAddrs',
        type: 'address[]',
        internalType: 'address[]',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'batchUnfollow',
    inputs: [
      {
        name: '_targetAddrs',
        type: 'address[]',
        internalType: 'address[]',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'editAccount',
    inputs: [
      {
        name: '_name',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_avatar',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_bio',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_company',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_location',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_website',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_socialAccounts',
        type: 'string[]',
        internalType: 'string[]',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'follow',
    inputs: [
      {
        name: '_targetAddr',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getAccountDetails',
    inputs: [
      {
        name: '_account',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '_id',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_name',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_avatar',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_bio',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_company',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_location',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_website',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_socialAccounts',
        type: 'string[]',
        internalType: 'string[]',
      },
      {
        name: '_followingNumber',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_followerNumber',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAccountDetailsByName',
    inputs: [
      {
        name: '_name',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [
      {
        name: '_id',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_account',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_avatar',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_bio',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_company',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_location',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_website',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_socialAccounts',
        type: 'string[]',
        internalType: 'string[]',
      },
      {
        name: '_followingNumber',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_followerNumber',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAccountId',
    inputs: [
      {
        name: '_account',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAccountName',
    inputs: [
      {
        name: '_account',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getBatchAccountById',
    inputs: [
      {
        name: '_ids',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    outputs: [
      {
        name: '_accounts',
        type: 'address[]',
        internalType: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getBatchAccountName',
    inputs: [
      {
        name: '_accounts',
        type: 'address[]',
        internalType: 'address[]',
      },
    ],
    outputs: [
      {
        name: '_names',
        type: 'string[]',
        internalType: 'string[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getFollower',
    inputs: [
      {
        name: '_account',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'offset',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'limit',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '_ids',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: '_totalLength',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getFollowing',
    inputs: [
      {
        name: '_account',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'offset',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'limit',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '_ids',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: '_totalLength',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'register',
    inputs: [
      {
        name: '_account',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_name',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_avatar',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_bio',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_company',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_location',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_website',
        type: 'string',
        internalType: 'string',
      },
      {
        name: '_socialAccounts',
        type: 'string[]',
        internalType: 'string[]',
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
    name: 'unfollow',
    inputs: [
      {
        name: '_targetAddr',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
] as const;

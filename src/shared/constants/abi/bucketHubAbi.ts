export const BUCKET_HUB_ABI = [
  {
    type: 'function',
    name: 'createBucket',
    inputs: [
      {
        name: 'createPackage',
        type: 'tuple',
        internalType: 'struct BucketStorage.CreateBucketSynPackage',
        components: [
          {
            name: 'creator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'name',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'visibility',
            type: 'uint8',
            internalType: 'enum BucketStorage.BucketVisibilityType',
          },
          {
            name: 'paymentAddress',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'primarySpAddress',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'primarySpApprovalExpiredHeight',
            type: 'uint64',
            internalType: 'uint64',
          },
          {
            name: 'globalVirtualGroupFamilyId',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'primarySpSignature',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'chargedReadQuota',
            type: 'uint64',
            internalType: 'uint64',
          },
          {
            name: 'extraData',
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
    name: 'createBucket',
    inputs: [
      {
        name: 'createPackage',
        type: 'tuple',
        internalType: 'struct BucketStorage.CreateBucketSynPackage',
        components: [
          {
            name: 'creator',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'name',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'visibility',
            type: 'uint8',
            internalType: 'enum BucketStorage.BucketVisibilityType',
          },
          {
            name: 'paymentAddress',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'primarySpAddress',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'primarySpApprovalExpiredHeight',
            type: 'uint64',
            internalType: 'uint64',
          },
          {
            name: 'globalVirtualGroupFamilyId',
            type: 'uint32',
            internalType: 'uint32',
          },
          {
            name: 'primarySpSignature',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'chargedReadQuota',
            type: 'uint64',
            internalType: 'uint64',
          },
          {
            name: 'extraData',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
      {
        name: 'callbackGasLimit',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'extraData',
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
    name: 'deleteBucket',
    inputs: [
      {
        name: 'tokenId',
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
  {
    type: 'function',
    name: 'deleteBucket',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'callbackGasLimit',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'extraData',
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
] as const;

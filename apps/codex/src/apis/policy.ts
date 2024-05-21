import { PERMISSION_HUB_ADDRESS } from '@/env';
import { POLICY_ACCOUNT } from '@/modules/dashboard/hooks/usePutPolicy';
import { PermissionHubAbi } from '@/shared/constants/abi/permissonHubAbi';
import { Address, PublicClient, WalletClient, toHex } from 'viem';

export const putPolicy = async ({
  address,
  publicClient,
  walletClient,
  fees,
  bytes,
}: {
  publicClient?: PublicClient;
  walletClient?: WalletClient;
  address: Address;
  fees?: bigint;
  bytes: Uint8Array;
}) => {
  if (!publicClient || !walletClient || !fees) return;

  const { request } = await publicClient.simulateContract({
    account: address,
    address: PERMISSION_HUB_ADDRESS,
    abi: PermissionHubAbi,
    functionName: 'createPolicy',
    args: [toHex(bytes)],
    value: fees,
  });

  // console.log('request', request);

  const hash = await walletClient.writeContract(request);
  console.log('hash', hash);

  const tx = await publicClient.waitForTransactionReceipt({
    hash: hash,
  });

  return tx;
};

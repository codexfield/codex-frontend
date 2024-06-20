import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { useQueryUser } from './useQueryUser';
import { useToast } from '@chakra-ui/react';
import { useQueryRank } from './useQueryRank';
import { AIRDROP_DOMAIN } from '@/env';

interface IVerifyParams {
  taskName: string;
  bucketName?: string;
}

export const useVerify = () => {
  const { address } = useAccount();
  const { refetch: refetchRankList } = useQueryRank(address);
  const { openConnectModal } = useConnectModal();
  const { refetch: refetchUser } = useQueryUser(address);
  const toast = useToast();

  return useMutation({
    mutationFn: async (params: IVerifyParams) => {
      const { taskName, bucketName } = params;

      if (!address) {
        openConnectModal?.();
        return;
      }

      const veriflyParams: Record<string, string> = {
        address,
        task_name: taskName,
      };
      if (bucketName) {
        veriflyParams.bucket_name = bucketName;
      }

      const res = await axios.get(`${AIRDROP_DOMAIN}/verify`, {
        params: veriflyParams,
      });

      // console.log('res', res);

      if (res.data.code === 0) {
        // success
      } else {
        toast({
          title: 'Error',
          description: res.data.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }

      refetchUser();
      refetchRankList();
    },
  });
};

import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { AIRDROP_DOMAIN } from '../api';
import { useQueryUser } from './useQueryUser';
import { useToast } from '@chakra-ui/react';
import { useQueryRank } from './useQueryRank';

interface IVerifyParams {
  taskName: string;
}

export const useVerify = () => {
  const { address } = useAccount();
  const { refetch: refetchRankList } = useQueryRank(address);
  const { openConnectModal } = useConnectModal();
  const { refetch: refetchUser } = useQueryUser(address);
  const toast = useToast();

  return useMutation({
    mutationFn: async (params: IVerifyParams) => {
      const { taskName } = params;

      if (!address) {
        openConnectModal?.();
        return;
      }

      const res = await axios.get(`${AIRDROP_DOMAIN}/verify`, {
        params: {
          address,
          task_name: taskName,
        },
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

import { useMutation } from '@tanstack/react-query';
import * as axios from 'axios';
import { AIRDROP_DOMAIN } from '../api';
import { useQueryUser } from './useQueryUser';

interface IConnectTwitterParams {
  address?: string;
  referenceCode?: string;
}

export const useConnectTwitter = (params: IConnectTwitterParams) => {
  const { address, referenceCode } = params;

  const { refetch, data: userInfo } = useQueryUser(address);

  return useMutation({
    mutationFn: async () => {
      if (!address) return;

      const response = await fetch(
        `${AIRDROP_DOMAIN}/connect/twitter?address=${address}&reference_code=${referenceCode}`,
        {
          redirect: 'manual',
        },
      );

      // console.log('response', response);
      // console.log('res', response.url);
      // return response;

      // 302 redirect

      // window.location.href = response.url;
      const popup = window.open(response.url, '', `height=400, width=600`);

      const timer = setInterval(() => {
        refetch();
        if (userInfo?.code !== 0) {
          popup?.close();
          clearInterval(timer);
        }
      }, 3000);
    },
    onSuccess: (data) => {
      // ...
      console.log('onSuccess', data);
    },
    onError: (error) => {
      // ...
      console.log('error', error);
    },
  });
};

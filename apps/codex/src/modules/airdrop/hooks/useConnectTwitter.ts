import { useMutation } from '@tanstack/react-query';
import * as axios from 'axios';
import { AIRDROP_DOMAIN } from '../api';

interface IConnectTwitterParams {
  address?: string;
  referenceCode?: string;
}

export const useConnectTwitter = (params: IConnectTwitterParams) => {
  return useMutation({
    mutationFn: async () => {
      const { address, referenceCode } = params;
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

      window.location.href = response.url;
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

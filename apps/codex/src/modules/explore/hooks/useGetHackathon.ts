import { AIRDROP_DOMAIN } from '@/modules/airdrop/api';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Address } from 'viem';

const PAGE_SIZE = 30;

interface Params {
  address?: Address;
  page: number;
}

interface Response {
  code: number;
  message: string;
  result: {
    cursor: string;
    repoInfoList: {
      codex_bucket_id: string;
      created_at: string;
      description: string;
      like_count: string;
      repo_name: string;
      repo_type: number;
      tag_list: string[];
      unlike_count: string;
      wallet_address: string;
    }[];
  };
}

export const useHackathon = ({ page, address }: Params) => {
  return useQuery<Response>({
    enabled: !!address,
    queryKey: ['hackathon', address, page],
    queryFn: async (): Promise<Response> => {
      // if (!address) return;

      const res = await axios.get(`${AIRDROP_DOMAIN}/repo/query/hackathon`, {
        params: {
          address,
          cursor: page,
        },
      });
      return res.data;
    },
  });
};

// export const useHackathon = (address?: Address) => {
//   return useInfiniteQuery({
//     queryKey: ['hackathon', address],
//     queryFn: async ({ pageParam }) => {
//       if (!address) return;

//       const res = await axios.get(`${AIRDROP_DOMAIN}/repo/query/hackathon`, {
//         params: {
//           address,
//           cursor: pageParam,
//         },
//       });
//       return res.data;
//     },
//     getNextPageParam: (lastPage, pages) => {
//       if (lastPage.length < PAGE_SIZE) {
//         return undefined;
//       }
//       return lastPage.nextCursor;
//     },
//     initialPageParam: 0,
//   });
// };

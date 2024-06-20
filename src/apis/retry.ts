import { AIRDROP_DOMAIN } from '@/env';
import axios from 'axios';

interface Params {
  codexBucketId: string;
  accessToken?: string;
}

interface IResult {
  code: number;
  message: string;
}

export const retry = async ({ codexBucketId, accessToken }: Params) => {
  return await axios.get<Promise<IResult>>(`${AIRDROP_DOMAIN}/repo/retry`, {
    params: {
      codex_bucket_id: codexBucketId,
      access_token: accessToken,
    },
  });
};

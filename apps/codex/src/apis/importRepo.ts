import { GreenfieldClient } from '@/config/GnfsClient';
import { AIRDROP_DOMAIN } from '@/modules/airdrop/api';
import axios from 'axios';

interface IImportGithubResult {
  code: number;
}

interface IImportGithubParams {
  address: string;

  bucketName: string;

  // codexBucketId: string;

  /**
   * repo source url https://github.com/codexfield/gitd.git
   */
  repoUrl: string;
  /**
   * 0: private
   * 1: public
   */
  repoType: '0' | '1';

  /**
   * repo dst url gnfd://xxxxx/
   */
  gnfdUrl: string;

  accessToken?: string;
}

export const importRepo = async ({
  address,
  repoUrl,
  repoType,
  gnfdUrl,
  bucketName,
  accessToken,
}: IImportGithubParams) => {
  const bucketDetail = await GreenfieldClient.bucket.headBucket(bucketName);

  const params: Record<string, string | undefined> = {
    address,
    codex_bucket_id: bucketDetail.bucketInfo?.id,
    repo_url: repoUrl,
    repo_type: repoType,
    gnfd_url: gnfdUrl,
  };

  if (accessToken) {
    params.access_token = accessToken;
  }

  const res = await axios.get<Promise<IImportGithubResult>>(`${AIRDROP_DOMAIN}/repo/import`, {
    params,
  });

  console.log('importRepo', res);

  return res.data;
};

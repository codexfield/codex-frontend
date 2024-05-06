import { importRepo } from '@/apis/importRepo';
import { useGetAccountDetails } from '@/shared/hooks/contract/useGetAccountDetails';
import { getBucketName, getCloneUrlByRepoName } from '@/shared/utils';
import { VisibilityType } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/common';
import { useAccount } from 'wagmi';

interface Params {
  repoName: string;
  githubUrl: string;
  visibility: keyof typeof VisibilityType;
  onSuccess?: () => Promise<void>;
  onFailure?: () => Promise<void>;
}

export const useImportGithub = ({
  repoName,
  githubUrl,
  onFailure,
  onSuccess,
  visibility,
}: Params) => {
  const { address } = useAccount();

  const { data: userInfo } = useGetAccountDetails(address);

  const doImport = async () => {
    try {
      if (!userInfo || !address) return;

      const bucketName = getBucketName(repoName, userInfo.id);

      console.log('visibility', visibility);
      console.log('visi', VisibilityType.VISIBILITY_TYPE_PRIVATE.toString());

      await importRepo({
        bucketName,
        address,
        repoUrl: githubUrl,
        gnfdUrl: getCloneUrlByRepoName(userInfo.id.toString(), repoName),
        repoType: visibility === 'VISIBILITY_TYPE_PRIVATE' ? '0' : '1',
      });

      onSuccess?.();
    } catch (e) {
      onFailure?.();
    }
  };

  return {
    doImport,
  };
};

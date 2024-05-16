import { GreenfieldClient } from '@/config/GnfsClient';
import { offchainDataAtom } from '@/shared/atoms/offchainDataAtom';
import { UserInfo } from '@/shared/hooks/contract/useGetAccountDetails';
import { getBlogSpaceName } from '@/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

export const useGetBlogContent = ({
  userInfo,
  objectName,
}: {
  userInfo?: UserInfo;
  objectName: string;
}) => {
  const bucketName = getBlogSpaceName(userInfo?.id || BigInt(0));
  const offchainData = useAtomValue(offchainDataAtom);

  console.log(userInfo && userInfo.id && userInfo.id !== BigInt(0));

  return useQuery({
    enabled: !!objectName,
    queryKey: ['BLOG_CONTENT', bucketName, objectName],
    queryFn: async () => {
      if (!objectName) return '';
      if (!offchainData || !offchainData.seed) return '';
      if (userInfo?.id === BigInt(0)) return '';

      const res = await GreenfieldClient.object.getObject(
        {
          bucketName,
          objectName,
        },
        {
          type: 'EDDSA',
          domain: window.location.origin,
          seed: offchainData.seed,
          address: offchainData.address,
        },
      );

      return await res.body?.text();
    },
  });
};

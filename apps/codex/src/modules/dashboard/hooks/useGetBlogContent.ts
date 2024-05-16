import { GreenfieldClient } from '@/config/GnfsClient';
import { offchainDataAtom } from '@/shared/atoms/offchainDataAtom';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

export const useGetBlogContent = (bucketName: string, objectName: string) => {
  const offchainData = useAtomValue(offchainDataAtom);

  return useQuery({
    queryKey: ['BLOG_CONTENT', bucketName, objectName],
    queryFn: async () => {
      if (!offchainData || !offchainData.seed) return;

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

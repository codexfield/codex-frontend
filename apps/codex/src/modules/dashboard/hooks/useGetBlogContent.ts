import { GreenfieldClient } from '@/config/GnfsClient';
import { offchainDataAtom } from '@/shared/atoms/offchainDataAtom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAtomValue } from 'jotai';

export const useGetBlogContent = ({
  bucketName,
  objectName,
  endpoint,
  visibility,
}: {
  bucketName: string;
  objectName: string;
  endpoint?: string;
  visibility?: string;
}) => {
  const offchainData = useAtomValue(offchainDataAtom);

  return useQuery({
    enabled: !!objectName && !!endpoint,
    queryKey: ['BLOG_CONTENT', bucketName, objectName],
    queryFn: async () => {
      if (!objectName) return '';

      if (visibility === '1') {
        // public
        const res = await axios.get(`${endpoint}/view/${bucketName}/${objectName}`);

        return res.data;
      } else if (visibility === '2') {
        // private

        if (!offchainData || !offchainData.seed) return '';
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
      }

      // console.log(`${endpoint}/view/${bucketName}/${objectName}`);

      // const res = await GreenfieldClient.object.getObject(
      //   {
      //     bucketName,
      //     objectName,
      //   },
      //   {
      //     type: 'EDDSA',
      //     domain: window.location.origin,
      //     seed: offchainData.seed,
      //     address: offchainData.address,
      //   },
      // );

      // return await res.body?.text();
    },
  });
};

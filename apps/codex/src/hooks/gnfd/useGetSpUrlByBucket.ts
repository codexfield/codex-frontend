import { GreenfieldClient } from '@/config/client';
import { useEffect, useState } from 'react';

/**
 * get endpoint by repo name
 */
export const useGetSpUrlByBucket = (repoName?: string) => {
  const [endpoint, setEndpoint] = useState('');

  useEffect(() => {
    // console.log('useGetSpUrlByBucket', repoName);
    const getEndpoint = async () => {
      if (!repoName) {
        return;
      }
      const res = await GreenfieldClient.sp.getSPUrlByBucket(repoName);
      console.log('res', res);
      setEndpoint(res);
    };

    getEndpoint();
  }, [repoName]);

  return endpoint;
};

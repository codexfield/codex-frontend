import { UpdateBucketParams, updateBucket } from '@/apis/updateBucket';
import { useMutation } from '@tanstack/react-query';

export const useUpdateBucket = () => {
  return useMutation({
    onSuccess: (data) => {
      // console.log('success', data);
    },
    onError(error, variables, context) {
      console.log('error', error, variables, context);
    },
    mutationFn: (updateBucketInfoParams: UpdateBucketParams) => {
      return updateBucket(updateBucketInfoParams);
    },
  });
};

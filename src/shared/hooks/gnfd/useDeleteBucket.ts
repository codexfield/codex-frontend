import { deleteBucket } from '@/apis/deleteBucket';
import { useMutation } from '@tanstack/react-query';

export const useDeleteBucket = () => {
  return useMutation({
    onSuccess: (data) => {
      // console.log('success', data);
    },
    onError(error, variables, context) {
      console.log('error', error, variables, context);
    },
    mutationFn: (params: { bucketName: string; address: `0x${string}` }) => {
      return deleteBucket(params.bucketName, params.address);
    },
  });
};

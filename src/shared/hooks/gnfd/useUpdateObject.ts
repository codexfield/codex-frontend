import { UpdateObjectParams, updateObject } from '@/apis/updateObject';
import { useMutation } from '@tanstack/react-query';

export const useUpdateObject = () => {
  return useMutation({
    onSuccess: (data) => {
      // console.log('success', data);
    },
    onError(error, variables, context) {
      console.log('error', error, variables, context);
    },
    mutationFn: (updateObjectParams: UpdateObjectParams) => {
      return updateObject(updateObjectParams);
    },
  });
};

import { useQueryClient } from 'react-query';

import { useAxiosMutation } from '@api/wrappers/react-query/useAxiosMutation';

import {
  path,
  ChangeDeveloperSquadSuccess,
  ChangeDeveloperSquadError,
  RequestBody,
} from './../specs/DevsController/changeDeveloperSquad';

export const useChangeDevSquadMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useAxiosMutation<
    ChangeDeveloperSquadSuccess,
    ChangeDeveloperSquadError,
    RequestBody
  >({
    url: path,
    method: 'POST',
    options: {
      onSuccess: () => {
        void queryClient.invalidateQueries('devs');
      },
    },
  });

  return mutation;
};

import { useAxiosMutation } from '@api/wrappers/react-query/useAxiosMutation';

import {
  path,
  type ChangeDeveloperSquadSuccess,
  type ChangeDeveloperSquadError,
  type RequestBody,
} from './../../specs/DevsController/changeDeveloperSquad';

export const useChangeDevSquadMutation = () => {
  const mutation = useAxiosMutation<
    ChangeDeveloperSquadSuccess,
    ChangeDeveloperSquadError,
    RequestBody
  >({
    url: path,
    method: 'POST',
  });

  return mutation;
};

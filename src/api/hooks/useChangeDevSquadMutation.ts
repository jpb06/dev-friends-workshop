import { useMutation, UseMutationResult, useQueryClient } from "react-query";

import { changeDevSquad } from "../rest/changeDevSquad";

interface ChangeDevSquadData {
  devId: number;
  squadId: number;
}

export const useChangeDevSquadMutation = (): UseMutationResult<
  any,
  any,
  ChangeDevSquadData
> => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: ChangeDevSquadData) => changeDevSquad(data.devId, data.squadId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("devs");
      },
    }
  );

  return mutation;
};

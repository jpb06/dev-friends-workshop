import { useMutation, UseMutationResult, useQueryClient } from "react-query";

import { axiosPost } from "@logic/axios/axios.post.wrapper";

import { changeDevSquadUrl } from "./config";

interface ChangeDevSquadData {
  idDev: number;
  idSquad: number;
}

export const useChangeDevSquadMutation = (): UseMutationResult<
  any,
  any,
  ChangeDevSquadData
> => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: ChangeDevSquadData) => axiosPost<string>(changeDevSquadUrl, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("devs");
      },
    }
  );

  return mutation;
};

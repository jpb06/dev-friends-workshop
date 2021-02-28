import { changeDevSquadUrl } from "./api.config";
import { post } from "./axios.wrappers";

export const changeDevSquad = async (
  devId: number,
  squadId: number
): Promise<string> => {
  const result = await post<string>(changeDevSquadUrl, { devId, squadId });
  return result;
};

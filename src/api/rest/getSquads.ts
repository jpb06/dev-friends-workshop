import axios from "axios";

import { Squad } from "@owntypes/squad.interface";

import { squadsUrl } from "./api.config";

export const getSquads = async (): Promise<Array<Squad>> => {
  const result = await axios.get<Array<Squad>>(squadsUrl);
  return result.data;
};

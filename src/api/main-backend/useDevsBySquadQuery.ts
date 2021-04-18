import { QueryObserverResult, useQuery } from "react-query";

import { axiosPost } from "@logic/axios/axios.post.wrapper";
import { Dev } from "@owntypes/dev.interface";
import { Squad } from "@owntypes/squad.interface";

import { devsByUrl } from "./config";

export const useDevsBySquadQuery = (
  squads?: Array<Squad>
): QueryObserverResult<Array<Dev>> =>
  useQuery(
    ["devs", squads],
    () =>
      axiosPost<Array<Dev>>(devsByUrl, { squads: squads.map((el) => el.id) }),
    {
      enabled: squads !== undefined,
    }
  );

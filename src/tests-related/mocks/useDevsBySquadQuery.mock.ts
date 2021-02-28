import { QueryObserverResult } from "react-query";
import { MockedFunction } from "ts-jest/dist/utils/testing";
import { mocked } from "ts-jest/utils";
import { Dev } from "types/dev.interface";

import { useDevsBySquadQuery } from "@api/useDevsBySquadQuery.hook";
import { Squad } from "@owntypes/squad.interface";

export const setUseDevsBySquadReturnValue = (
  data: Array<Squad>
): MockedFunction<(squads?: Squad[]) => QueryObserverResult<Dev[], unknown>> =>
  mocked(useDevsBySquadQuery).mockReturnValueOnce({ data } as any);

import { QueryObserverResult } from "react-query";
import { MockedFunction } from "ts-jest/dist/utils/testing";
import { mocked } from "ts-jest/utils";

import { useSquadsQuery } from "@api/useSquadsQuery.hook";
import { Squad } from "@owntypes/squad.interface";

export const setUseSquadsReturnValue = (
  data?: Array<Squad>
): MockedFunction<() => QueryObserverResult<Squad[], unknown>> =>
  mocked(useSquadsQuery).mockReturnValue({ data } as any);

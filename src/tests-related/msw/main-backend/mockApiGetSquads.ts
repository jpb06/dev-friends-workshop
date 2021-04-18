import { RequestHandler, rest } from "msw";

import { squadsUrl } from "@api/main-backend/config";
import { Squad } from "@owntypes//squad.interface";

export const mockApiGetSquads = (
  data: Array<Squad>,
  status = 200
): RequestHandler =>
  rest.get(squadsUrl, (req, res, ctx) => {
    return res(ctx.status(status), ctx.json(data));
  });

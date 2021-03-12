import { RequestHandler, rest } from "msw";

import { Squad } from "@owntypes//squad.interface";

import { squadsUrl } from "../../api/rest/api.config";

export const mockApiGetSquads = (
  data: Array<Squad>,
  status = 200
): RequestHandler =>
  rest.get(squadsUrl, (req, res, ctx) => {
    return res(ctx.status(status), ctx.json(data));
  });

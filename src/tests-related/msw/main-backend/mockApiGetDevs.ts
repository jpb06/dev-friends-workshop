import { RequestHandler, rest } from "msw";

import { devsUrl } from "@api/main-backend/config";
import { Dev } from "@owntypes/dev.interface";

export const mockApiGetDevs = (
  data: Array<Dev>,
  status = 200
): RequestHandler =>
  rest.get(devsUrl, (req, res, ctx) => {
    return res(ctx.status(status), ctx.json(data));
  });

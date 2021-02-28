import { RequestHandler, rest } from "msw";
import { Dev } from "types/dev.interface";

import { devsUrl } from "../../api/rest/api.config";

export const mockApiGetDevs = (
  data: Array<Dev>,
  status = 200
): RequestHandler =>
  rest.get(devsUrl, (req, res, ctx) => {
    return res(ctx.status(status), ctx.json(data));
  });

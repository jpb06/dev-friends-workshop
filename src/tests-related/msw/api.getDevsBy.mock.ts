import { RequestHandler, rest } from "msw";
import { Dev } from "types/dev.interface";

import { devsByUrl } from "../../api/rest/api.config";

export const mockApiGetDevsBy = (
  data: Array<Dev>,
  status = 200
): RequestHandler =>
  rest.post(devsByUrl, (req, res, ctx) => {
    return res(ctx.status(status), ctx.json(data));
  });

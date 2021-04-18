import { RequestHandler, rest } from "msw";

import { genericGetUrl } from "@tests/api/config";

export const mswGenericGetSuccess = (): RequestHandler =>
  rest.get<string>(genericGetUrl, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "generic get" }));
  });

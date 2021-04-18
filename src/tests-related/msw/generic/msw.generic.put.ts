import { RequestHandler, rest } from "msw";

import { genericPutUrl } from "@tests/api/config";

export const mswGenericPutSuccess = (): RequestHandler =>
  rest.put<string>(genericPutUrl, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "generic put" }));
  });

export const mswGenericPutFailure = (): RequestHandler =>
  rest.put<string>(genericPutUrl, (_, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({ message: "generic put error message" })
    );
  });

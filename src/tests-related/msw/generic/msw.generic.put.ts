import { RequestHandler, rest } from "msw";

import { genericPutUrl } from "@tests/api/config";

export const mswGenericPutSuccess = (): RequestHandler =>
  rest.put<unknown>(genericPutUrl, (_, res, ctx) =>
    res(ctx.status(200), ctx.json({ message: "generic put" }))
  );

export const mswGenericPutFailure = (): RequestHandler =>
  rest.put<unknown>(genericPutUrl, (_, res, ctx) =>
    res(ctx.status(400), ctx.json({ message: "generic put error message" }))
  );

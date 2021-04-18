import { RequestHandler, rest } from "msw";

import { genericPostUrl } from "@tests/api/config";

export const mswGenericPostSuccess = (): RequestHandler =>
  rest.post<unknown>(genericPostUrl, (_, res, ctx) =>
    res(ctx.status(200), ctx.json({ message: "generic post" }))
  );

export const mswGenericPostFailure = (): RequestHandler =>
  rest.post<unknown>(genericPostUrl, (_, res, ctx) =>
    res(ctx.status(400), ctx.json({ message: "generic post error message" }))
  );

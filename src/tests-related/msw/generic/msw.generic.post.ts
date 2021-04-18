import { RequestHandler, rest } from "msw";

import { genericPostUrl } from "@tests/api/config";

export const mswGenericPostSuccess = (): RequestHandler =>
  rest.post<string>(genericPostUrl, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "generic post" }));
  });

export const mswGenericPostFailure = (): RequestHandler =>
  rest.post<string>(genericPostUrl, (_, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({ message: "generic post error message" })
    );
  });

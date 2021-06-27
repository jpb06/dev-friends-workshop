import { RequestHandler, rest } from 'msw';

import { genericGetUrl } from '@tests/api/config';

export const mswGenericGetSuccess = (): RequestHandler =>
  rest.get<unknown>(genericGetUrl, (_, res, ctx) =>
    res(ctx.status(200), ctx.json({ message: "generic get" }))
  );

export const mswGenericGetFailure = (): RequestHandler =>
  rest.get<unknown>(genericGetUrl, (_, res, ctx) =>
    res(ctx.status(400), ctx.json({ message: "generic get error message" }))
  );

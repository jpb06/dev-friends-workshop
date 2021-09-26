import { RequestHandler, rest } from 'msw';

import { devsByUrl } from '@api/main-backend/config';
import { Dev } from '@type/dev.interface';

export const mockApiGetDevsBy = (
  data: Array<Dev>,
  status = 200
): RequestHandler =>
  rest.post(devsByUrl, (req, res, ctx) =>
    res(ctx.status(status), ctx.json(data))
  );

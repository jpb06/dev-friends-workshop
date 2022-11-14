import { DefaultBodyType, rest } from 'msw';

import { applyHandlerToServer } from '../../../tests/msw/handlers/applyHandlerToServer';
import { mainBackendUrl } from '../../main-backend/main-backend-url.constant';

export const genericGetUrl = `${mainBackendUrl}/get`;

export const getHandler = (
  status: number,
  result: DefaultBodyType,
  applyToServer = true
) => {
  const handler = rest.get(genericGetUrl, (_, res, ctx) =>
    res(ctx.status(status), ctx.json(result))
  );

  return applyHandlerToServer(handler, applyToServer);
};

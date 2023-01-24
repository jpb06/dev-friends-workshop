import { DefaultBodyType, rest } from 'msw';

import { applyHandlerToServer } from './applyHandlerToServer';
import { mainBackendUrl } from '../../../api/main-backend/main-backend-url.constant';

type GenericGetHandlerParams = {
  url: string;
  status: number;
  result: DefaultBodyType;
  applyToServer?: boolean;
};

export const genericGetHandler = ({
  url,
  status,
  result,
  applyToServer = true,
}: GenericGetHandlerParams) => {
  const handler = rest.get(`${mainBackendUrl}${url}`, (_, res, ctx) =>
    res(ctx.status(status), ctx.json(result))
  );

  return applyHandlerToServer(handler, applyToServer);
};

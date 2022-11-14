import { DefaultBodyType, rest } from 'msw';

import { mainBackendUrl } from '../../../api/main-backend/main-backend-url.constant';
import { applyHandlerToServer } from './applyHandlerToServer';

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

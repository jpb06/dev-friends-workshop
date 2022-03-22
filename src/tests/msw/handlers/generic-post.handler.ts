import { DefaultRequestBody, rest } from 'msw';

import { applyHandlerToServer } from './applyHandlerToServer';

type GenericPostHandlerParams = {
  url: string;
  status: number;
  result: DefaultRequestBody;
  applyToServer?: boolean;
};

export const genericPostHandler = ({
  url,
  status,
  result,
  applyToServer = true,
}: GenericPostHandlerParams) => {
  const handler = rest.post(url, (_, res, ctx) =>
    res(ctx.status(status), ctx.json(result))
  );

  return applyHandlerToServer(handler, applyToServer);
};

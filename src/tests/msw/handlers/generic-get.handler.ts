import { DefaultRequestBody, rest } from 'msw';

import { applyHandlerToServer } from './applyHandlerToServer';

type GenericGetHandlerParams = {
  url: string;
  status: number;
  result: DefaultRequestBody;
  applyToServer?: boolean;
};

export const genericGetHandler = ({
  url,
  status,
  result,
  applyToServer = true,
}: GenericGetHandlerParams) => {
  const handler = rest.get(url, (_, res, ctx) =>
    res(ctx.status(status), ctx.json(result))
  );

  return applyHandlerToServer(handler, applyToServer);
};

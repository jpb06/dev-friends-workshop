import { DefaultRequestBody, rest } from 'msw';

import { applyHandlerToServer } from './applyHandlerToServer';

type GenericPostHandlerParams<T> = {
  url: string;
  status: number;
  result: DefaultRequestBody;
  resultFilter?: (item: T) => boolean;
  applyToServer?: boolean;
};

export const genericPostHandler = <T>({
  url,
  status,
  result,
  resultFilter,
  applyToServer = true,
}: GenericPostHandlerParams<T>) => {
  const handler = rest.post(url, (_, res, ctx) => {
    if (resultFilter) {
      return res(
        ctx.status(status),
        ctx.json({ result: (result as Array<unknown>).filter(resultFilter) })
      );
    } else {
      return res(ctx.status(status), ctx.json({ result }));
    }
  });

  return applyHandlerToServer(handler, applyToServer);
};
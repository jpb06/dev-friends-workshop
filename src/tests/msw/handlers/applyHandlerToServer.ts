import { DefaultRequestBody, MockedRequest, RestHandler } from 'msw';
import { SetupServerApi } from 'msw/lib/types/node';

export const applyHandlerToServer = (
  handler: RestHandler<MockedRequest<DefaultRequestBody>>,
  useServer: boolean
) => {
  if (useServer) {
    const { server }: { server: SetupServerApi } = require('./../server');
    return server.use(handler);
  }

  return handler;
};

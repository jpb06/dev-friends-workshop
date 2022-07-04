import { DefaultBodyType, MockedRequest, RestHandler } from 'msw';
import { SetupServerApi } from 'msw/lib/node';

export const applyHandlerToServer = (
  handler: RestHandler<MockedRequest<DefaultBodyType>>,
  useServer: boolean
) => {
  if (useServer) {
    const { server }: { server: SetupServerApi } = require('./../server');
    return server.use(handler);
  }

  return handler;
};

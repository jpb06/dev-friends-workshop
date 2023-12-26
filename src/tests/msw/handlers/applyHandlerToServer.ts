import { RequestHandler } from 'msw';

export const applyHandlerToServer = async (
  handler: RequestHandler,
  useServer: boolean,
) => {
  if (useServer) {
    const { server } = await import('./../server');

    return server.use(handler);
  }

  return handler;
};

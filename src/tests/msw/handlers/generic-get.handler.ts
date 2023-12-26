import { DefaultBodyType, HttpResponse, http } from 'msw';

import { mainBackendUrl } from '../../../api/main-backend/main-backend-url.constant';

import { applyHandlerToServer } from './applyHandlerToServer';

interface GenericGetHandlerParams {
  url: string;
  status: number;
  result: DefaultBodyType;
  applyToServer?: boolean;
}

export const genericGetHandler = async ({
  url,
  status,
  result,
  applyToServer = true,
}: GenericGetHandlerParams) => {
  const handler = http.get(`${mainBackendUrl}${url}`, () =>
    HttpResponse.json(result, { status }),
  );

  return applyHandlerToServer(handler, applyToServer);
};

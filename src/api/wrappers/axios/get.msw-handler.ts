import { type DefaultBodyType, HttpResponse, http } from 'msw';

import { applyHandlerToServer } from '../../../tests/msw/handlers/applyHandlerToServer';
import { mainBackendUrl } from '../../main-backend/main-backend-url.constant';

export const genericGetUrl = `${mainBackendUrl}/get`;

export const getHandler = async (
  status: number,
  result: DefaultBodyType,
  applyToServer = true,
) => {
  const handler = http.get(genericGetUrl, () =>
    HttpResponse.json(result, { status }),
  );

  return applyHandlerToServer(handler, applyToServer);
};

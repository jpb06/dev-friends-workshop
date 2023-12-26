import { DefaultBodyType, HttpResponse, http } from 'msw';

import { mainBackendUrl } from '../../../api/main-backend/main-backend-url.constant';

import { applyHandlerToServer } from './applyHandlerToServer';

interface GenericPostHandlerParams<T> {
  url: string;
  status: number;
  result: DefaultBodyType;
  resultFilter?: (item: T) => boolean;
  applyToServer?: boolean;
}

export const genericPostHandler = async <T>({
  url,
  status,
  result,
  resultFilter,
  applyToServer = true,
}: GenericPostHandlerParams<T>) => {
  const handler = http.post(`${mainBackendUrl}${url}`, () => {
    if (resultFilter) {
      return HttpResponse.json(
        { result: (result as unknown[]).filter(resultFilter) },
        { status },
      );
    }

    return HttpResponse.json({ result }, { status });
  });

  return applyHandlerToServer(handler, applyToServer);
};

import type { DefaultBodyType } from 'msw';

import { genericPostHandler } from '@tests/msw/handlers/generic-post.handler';

import type { DevDto } from './../../specs/api-types';
import { path } from './../../specs/DevsController/getDevelopersBySquads';

interface DevsBySquadQueryHandlerProps {
  result: DefaultBodyType;
  resultFilter?: (dev: DevDto) => boolean;
  status?: number;
  applyToServer?: boolean;
}

export const devsBySquadQueryHandler = async ({
  result,
  resultFilter,
  status = 200,
  applyToServer = true,
}: DevsBySquadQueryHandlerProps) =>
  genericPostHandler({
    url: path,
    status,
    result,
    resultFilter,
    applyToServer,
  });

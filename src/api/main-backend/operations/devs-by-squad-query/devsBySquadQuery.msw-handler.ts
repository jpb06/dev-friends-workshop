import { DefaultBodyType } from 'msw';

import { genericPostHandler } from '@tests/msw/handlers/generic-post.handler';

import { path } from './../../specs/DevsController/getDevelopersBySquads';
import { DevDto } from './../../specs/api-types';

type DevsBySquadQueryHandlerProps = {
  result: DefaultBodyType;
  resultFilter?: (dev: DevDto) => boolean;
  status?: number;
  applyToServer?: boolean;
};

export const devsBySquadQueryHandler = ({
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

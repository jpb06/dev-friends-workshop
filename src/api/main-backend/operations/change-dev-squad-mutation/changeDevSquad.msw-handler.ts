import type { DefaultBodyType } from 'msw';

import { genericPostHandler } from '@tests/msw/handlers/generic-post.handler';

import { path } from './../../specs/DevsController/changeDeveloperSquad';

export const changeDevSquadMutationHandler = async (
  result: DefaultBodyType,
  status = 200,
  applyToServer = true,
) =>
  genericPostHandler({ url: path, status, result: { result }, applyToServer });

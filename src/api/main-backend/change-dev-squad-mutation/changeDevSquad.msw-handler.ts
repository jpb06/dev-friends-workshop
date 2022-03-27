import { DefaultRequestBody } from 'msw';

import { genericPostHandler } from '@tests/msw/handlers/generic-post.handler';

import { path } from './../specs/DevsController/changeDeveloperSquad';

export const changeDevSquadMutationHandler = (
  result: DefaultRequestBody,
  status = 200,
  applyToServer = true
) =>
  genericPostHandler({ url: path, status, result: { result }, applyToServer });
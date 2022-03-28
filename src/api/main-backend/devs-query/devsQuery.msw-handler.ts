import { DefaultRequestBody } from 'msw';

import { genericGetHandler } from '@tests/msw/handlers/generic-get.handler';

import { path } from './../specs/DevsController/getAllDevelopers';

export const devsQueryHandler = (
  result: DefaultRequestBody,
  status = 200,
  applyToServer = true
) =>
  genericGetHandler({ url: path, status, result: { result }, applyToServer });

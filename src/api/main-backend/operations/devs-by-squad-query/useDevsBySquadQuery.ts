import { useAtom } from 'jotai';

import { useAxiosQuery } from '@api/wrappers/react-query/useAxiosQuery';

import { selectedSquadsAtom } from '../../../../state/selected-squads.atom';
import {
  path,
  GetDevelopersBySquadsSuccess,
  GetDevelopersBySquadsError,
} from './../../specs/DevsController/getDevelopersBySquads';

export const useDevsBySquadQuery = () => {
  const [squads] = useAtom(selectedSquadsAtom);

  return useAxiosQuery<
    GetDevelopersBySquadsSuccess,
    GetDevelopersBySquadsError
  >({
    key: ['devs', squads],
    url: path,
    method: 'POST',
    data: { idSquads: squads },
    options: {
      enabled: squads !== undefined,
    },
  });
};

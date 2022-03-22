import { useContext, useEffect } from 'react';

import { SquadDto } from '@api/main-backend/specs/api-types';

import { DevFriendsContext } from '../../../contexts/DevFriendsContext';

export const useSelectedSquadsInitialization = (
  squads: Array<SquadDto>
): void => {
  const { setSelectedSquads } = useContext(DevFriendsContext);

  useEffect(() => {
    if (squads !== undefined) {
      setSelectedSquads(squads);
    }
  }, [setSelectedSquads, squads]);
};

import { SquadDto } from '../../../../../../api/main-backend/specs/api-types';

type DevDescriptionHookResult = {
  description: string;
  squad: string;
};

export const useDevDescription = (
  idSquad: number,
  firstName: string,
  squads?: Array<SquadDto>
): DevDescriptionHookResult => {
  if (!squads) {
    return { description: '', squad: '' };
  }

  const name = squads.find((s) => s.id === idSquad)?.name || '';

  return {
    description: `${firstName} - ${name}`,
    squad: name,
  };
};

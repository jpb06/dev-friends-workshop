import type { SquadDto } from '../../../../../../api/main-backend/specs/api-types';

interface DevDescriptionHookResult {
  description: string;
  squad: string;
}

export const useDevDescription = (
  idSquad: number,
  firstName: string,
  squads?: SquadDto[],
): DevDescriptionHookResult => {
  if (!squads) {
    return { description: '', squad: '' };
  }

  const name = squads.find((s) => s.id === idSquad)?.name ?? '';

  return {
    description: `${firstName} - ${name}`,
    squad: name,
  };
};

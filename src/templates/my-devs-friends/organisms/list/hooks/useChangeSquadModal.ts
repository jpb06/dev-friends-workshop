import { type Dispatch, type SetStateAction, useState } from 'react';

import type { DevDto } from '@api/main-backend/specs/api-types';

interface ChangeSquadModalHookResult {
  handleDevSelected: (id: number) => void;
  selectedDev: DevDto | undefined;
}

export const useChangeSquadModal = (
  devs: DevDto[] | undefined,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
): ChangeSquadModalHookResult => {
  const [selectedDev, setSelectedDev] = useState<DevDto | undefined>(undefined);

  const handleDevSelected = (id: number) => {
    if (!devs) {
      return;
    }

    setSelectedDev(devs.find((el) => el.id === id));
    setIsModalOpen(true);
  };

  return {
    handleDevSelected,
    selectedDev,
  };
};

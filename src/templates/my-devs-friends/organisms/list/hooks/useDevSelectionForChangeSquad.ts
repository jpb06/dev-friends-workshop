import { useState } from 'react';

import { DevDto } from '@api/main-backend/specs/api-types';

interface SelectionLogicHook {
  handleDevSelected: (id: number) => void;
  selectedDev: DevDto | undefined;
}

export const useDevSelectionForChangeSquad = (
  devs: Array<DevDto>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
): SelectionLogicHook => {
  const [selectedDev, setSelectedDev] = useState<DevDto | undefined>(undefined);

  const handleDevSelected = (id: number) => {
    setSelectedDev(devs.find((el) => el.id === id));
    setIsModalOpen(true);
  };

  return {
    handleDevSelected,
    selectedDev,
  };
};

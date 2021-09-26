import { useState } from 'react';

import { Dev as DevType } from '@type/dev.interface';

interface SelectionLogicHook {
  handleDevSelected: (id: number) => void;
  selectedDev: DevType | undefined;
}

export const useSelectionLogic = (
  devs: Array<DevType>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
): SelectionLogicHook => {
  const [selectedDev, setSelectedDev] = useState<DevType | undefined>(
    undefined
  );

  const handleDevSelected = (id: number) => {
    setSelectedDev(devs.find((el) => el.id === id));
    setIsModalOpen(true);
  };

  return {
    handleDevSelected,
    selectedDev,
  };
};

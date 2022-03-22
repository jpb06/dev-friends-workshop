import { MutationStatus } from 'react-query';

import { useChangeDevSquadMutation } from '@api/main-backend';
import { DevDto } from '@api/main-backend/specs/api-types';

interface ModalActions {
  handleSquadChanged: (id: number) => void;
  handleCancel: () => void;
  status: MutationStatus;
}

export const useModalActions = (
  onClose: () => void,
  dev?: DevDto
): ModalActions => {
  const {
    mutateAsync: changeDevSquad,
    reset,
    status,
  } = useChangeDevSquadMutation();

  const handleSquadChanged = async (id: number) => {
    try {
      await changeDevSquad({ idDev: dev?.id, idSquad: id });
    } catch (err) {
      return;
    }

    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return {
    status,
    handleSquadChanged,
    handleCancel,
  };
};

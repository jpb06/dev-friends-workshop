import { type MutationStatus, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { useChangeDevSquadMutation } from '@api/main-backend';
import type { DevDto } from '@api/main-backend/specs/api-types';

interface ModalActions {
  handleSquadChanged: (id: number) => Promise<void>;
  handleCancel: () => void;
  status: MutationStatus;
}

export const useModalActions = (
  onClose: () => void,
  dev?: DevDto,
): ModalActions => {
  const { mutateAsync: changeDevSquad, reset } = useChangeDevSquadMutation();
  const [status, setStatus] = useState<MutationStatus>('idle');
  const queryClient = useQueryClient();

  const handleSquadChanged = async (id: number) => {
    if (!dev) {
      return;
    }

    try {
      setStatus('pending');
      await changeDevSquad({ idDev: dev?.id, idSquad: id });
      await queryClient.invalidateQueries({ queryKey: ['devs'] });
    } catch (error) {
      console.error(error);
      setStatus('error');
      return;
    }

    reset();
    onClose();
    // force pending state to be visible
    setTimeout(() => {
      setStatus('idle');
    }, 10);
  };

  const handleCancel = () => {
    reset();
    onClose();
    setStatus('idle');
  };

  return {
    status,
    handleSquadChanged,
    handleCancel,
  };
};

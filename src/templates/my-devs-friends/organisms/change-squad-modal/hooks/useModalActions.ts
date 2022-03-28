import { useContext, useState } from 'react';
import { MutationStatus } from 'react-query';

import {
  useChangeDevSquadMutation,
  useDevsBySquadQuery,
} from '@api/main-backend';
import { DevDto } from '@api/main-backend/specs/api-types';

import { DevFriendsContext } from '../../../contexts/DevFriendsContext';

type ModalActions = {
  handleSquadChanged: (id: number) => void;
  handleCancel: () => void;
  status: MutationStatus;
};

export const useModalActions = (
  onClose: () => void,
  dev?: DevDto
): ModalActions => {
  const { selectedSquads } = useContext(DevFriendsContext);
  const { refetch } = useDevsBySquadQuery(selectedSquads);
  const { mutateAsync: changeDevSquad, reset } = useChangeDevSquadMutation();
  const [status, setStatus] = useState<MutationStatus>('idle');

  const handleSquadChanged = async (id: number) => {
    try {
      setStatus('loading');
      await changeDevSquad({ idDev: dev?.id, idSquad: id });
      await refetch();
    } catch (err) {
      setStatus('error');
      return;
    }

    reset();
    onClose();
    setStatus('idle');
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

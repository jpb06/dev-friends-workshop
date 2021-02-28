import { MutationStatus } from "react-query";
import { Dev } from "types/dev.interface";

import { useChangeDevSquadMutation } from "@api/useChangeDevSquadMutation.hook";

interface ModalActions {
  handleSquadChanged: (id: number) => void;
  handleCancel: () => void;
  status: MutationStatus;
}

export const useModalActions = (
  onClose: () => void,
  dev?: Dev
): ModalActions => {
  const {
    mutateAsync: changeDevSquad,
    reset,
    status,
  } = useChangeDevSquadMutation();

  const handleSquadChanged = async (id: number) => {
    try {
      await changeDevSquad({ devId: dev?.id, squadId: id });
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

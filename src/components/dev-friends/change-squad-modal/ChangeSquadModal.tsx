import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';

import { BlockingError } from '@components/generic/blocking-error/BlockingError';
import { CircularLoading } from '@components/generic/circular-loading/CircularLoading';
import { DownTransition } from '@components/generic/down-transition/DownTransition';
import { Dev } from '@type/dev.interface';

import { useModalActions } from './hooks/useModalActions';
import { IdleState } from './states/IdleState';

interface ChangeSquadModalProps {
  onClose: () => void;
  isOpen: boolean;
  dev?: Dev;
}

export const ChangeSquadModal: React.FC<ChangeSquadModalProps> = ({
  onClose,
  isOpen,
  dev,
}): JSX.Element => {
  const { handleSquadChanged, handleCancel, status } = useModalActions(
    onClose,
    dev
  );

  if (!dev) return null;

  return (
    <Dialog
      disableEscapeKeyDown
      maxWidth="xs"
      aria-label="change-squad"
      open={isOpen}
      TransitionComponent={DownTransition}
    >
      <DialogTitle id="change-squad-title">
        Move {dev.firstName} to another squad
      </DialogTitle>
      <DialogContent dividers>
        {
          {
            idle: <IdleState dev={dev} onSquadChanged={handleSquadChanged} />,
            loading: <CircularLoading />,
            error: (
              <BlockingError
                title="Oh no!"
                content={`We were unable to modify ${dev.firstName}'s squad. Sorry!`}
              />
            ),
          }[status]
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Nevermind
        </Button>
      </DialogActions>
    </Dialog>
  );
};

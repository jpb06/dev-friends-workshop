import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { BlockingError } from 'molecules/blocking-error/BlockingError';
import { CircularLoading } from 'molecules/circular-loading/CircularLoading';
import { DownTransition } from 'molecules/down-transition/DownTransition';
import React from 'react';

import { DevDto } from '@api/main-backend/specs/api-types';

import { useModalActions } from './hooks/useModalActions';
import { IdleState } from './states/IdleState';

interface ChangeSquadModalProps {
  onClose: () => void;
  isOpen: boolean;
  dev?: DevDto;
}

export const ChangeSquadModal: React.FC<ChangeSquadModalProps> = ({
  onClose,
  isOpen,
  dev,
}) => {
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

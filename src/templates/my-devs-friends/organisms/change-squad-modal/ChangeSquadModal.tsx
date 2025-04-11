import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import type { FunctionComponent } from 'react';
import { match } from 'ts-pattern';

import type { DevDto } from '@api/main-backend/specs/api-types';
import { CircularLoading, DownTransition } from '@molecules';
import { appTheme } from '@theme';

import { ErrorBlock } from '../../molecules/error-block/ErrorBlock';
import { useModalActions } from './hooks/useModalActions';
import { TargetSquadSelection } from './target-squad-selection/TargetSquadSelection';

interface ChangeSquadModalProps {
  onClose: () => void;
  isOpen: boolean;
  dev?: DevDto;
}

export const ChangeSquadModal: FunctionComponent<ChangeSquadModalProps> = ({
  onClose,
  isOpen,
  dev,
}) => {
  const { handleSquadChanged, handleCancel, status } = useModalActions(
    onClose,
    dev,
  );

  if (!dev) {
    return null;
  }

  return (
    <Dialog
      disableEscapeKeyDown={true}
      maxWidth="xs"
      aria-label="change-squad"
      open={isOpen}
      TransitionComponent={DownTransition}
      sx={{ '& .MuiDialog-paper': { backgroundColor: 'black' } }}
    >
      <DialogTitle
        id="change-squad-title"
        sx={{ color: appTheme.colors.amber }}
      >
        Move {dev.firstName} to another squad
      </DialogTitle>
      <DialogContent dividers={true}>
        {match(status)
          .with('idle', () => (
            <TargetSquadSelection
              dev={dev}
              onSquadChanged={handleSquadChanged}
            />
          ))
          .with('pending', () => <CircularLoading />)
          .with('error', () => (
            <ErrorBlock title="Oh no!">
              Something went wrong... Sorry!
            </ErrorBlock>
          ))
          .otherwise(() => null)}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Nevermind
        </Button>
      </DialogActions>
    </Dialog>
  );
};

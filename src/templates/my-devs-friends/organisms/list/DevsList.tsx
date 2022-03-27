import InfoIcon from '@mui/icons-material/Info';
import React, { useContext, useEffect, useState } from 'react';

import { useDevsBySquadQuery } from '@api/main-backend';
import { GlobalIndicator } from '@molecules';

import { DevFriendsContext } from '../../contexts/DevFriendsContext';
import { useReportOnErrors } from '../../hooks/useReportOnErrors';
import { useReportOnReady } from '../../hooks/useReportOnReady';
import { ChangeSquadModal } from '../change-squad-modal/ChangeSquadModal';
import { DevSkeleton } from './dev-skeleton/DevSkeleton';
import { Dev } from './dev/Dev';
import { useSelectionLogic } from './hooks/useSelectionLogic';

export const DevsList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { selectedSquads, setStatus } = useContext(DevFriendsContext);

  const {
    data: devs,
    isError,
    isFetched,
  } = useDevsBySquadQuery(selectedSquads);

  useReportOnErrors(isError);
  useReportOnReady(devs);
  const { selectedDev, handleDevSelected } = useSelectionLogic(
    devs,
    setIsModalOpen
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isFetched && !devs) {
      setStatus('errored');
    }
  }, [devs, isFetched]);

  if (!isFetched || !devs) {
    return null;
  }

  if (devs.length === 0) {
    return (
      <GlobalIndicator title="No results" Icon={InfoIcon}></GlobalIndicator>
    );
  }

  return (
    <>
      <>
        {devs.map((dev) =>
          isModalOpen ? (
            <DevSkeleton key={dev.id} />
          ) : (
            <Dev key={dev.id} onSelected={handleDevSelected} {...dev} />
          )
        )}
      </>
      <ChangeSquadModal
        isOpen={isModalOpen}
        dev={selectedDev}
        onClose={handleCloseModal}
      />
    </>
  );
};

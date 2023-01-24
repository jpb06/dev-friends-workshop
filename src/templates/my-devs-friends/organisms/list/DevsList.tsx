import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from 'react';

import { useDevsBySquadQuery } from '@api/main-backend';
import { GlobalIndicator } from '@molecules';

import { Dev } from './dev/Dev';
import { DevSkeleton } from './dev-skeleton/DevSkeleton';
import { useChangeSquadModal } from './hooks/useChangeSquadModal';
import { useReportOnErrors } from '../../hooks/useReportOnErrors';
import { useReportOnReady } from '../../hooks/useReportOnReady';
import { ChangeSquadModal } from '../change-squad-modal/ChangeSquadModal';

export const DevsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: devs, isError, isFetched } = useDevsBySquadQuery();

  useReportOnErrors(isError, isFetched, devs);
  useReportOnReady(devs);
  const { selectedDev, handleDevSelected } = useChangeSquadModal(
    devs,
    setIsModalOpen
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

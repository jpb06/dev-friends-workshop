import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';

import { useDevsBySquadQuery } from '@api/main-backend';
import { GlobalIndicator } from '@molecules';

import { useReportOnErrors } from '../../hooks/useReportOnErrors';
import { useReportOnReady } from '../../hooks/useReportOnReady';
import { ChangeSquadModal } from '../change-squad-modal/ChangeSquadModal';

import { Dev } from './dev/Dev';
import { DevSkeleton } from './dev-skeleton/DevSkeleton';
import { useChangeSquadModal } from './hooks/useChangeSquadModal';

export const DevsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: devs, isError, isFetched } = useDevsBySquadQuery();

  useReportOnErrors(isError, isFetched, devs);
  useReportOnReady(devs);
  const { selectedDev, handleDevSelected } = useChangeSquadModal(
    devs,
    setIsModalOpen,
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!isFetched || !devs) {
    return null;
  }

  if (devs.length === 0) {
    return <GlobalIndicator title="No results" Icon={InfoIcon} />;
  }

  return (
    <>
      <>
        {devs.map((dev) =>
          isModalOpen ? (
            <DevSkeleton key={dev.id} />
          ) : (
            <Dev key={dev.id} onSelected={handleDevSelected} {...dev} />
          ),
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

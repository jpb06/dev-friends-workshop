import React, { useContext, useState } from 'react';

import { useDevsBySquadQuery } from '@api/main-backend';
import { BlockingError } from '@molecules';

import { DevFriendsContext } from '../../contexts/DevFriendsContext';
import { useReportOnErrors } from '../../hooks/useReportOnErrors';
import { useReportOnReady } from '../../hooks/useReportOnReady';
import { ChangeSquadModal } from '../change-squad-modal/ChangeSquadModal';
import { Dev } from './dev/Dev';
import { useSelectionLogic } from './hooks/useSelectionLogic';

export const DevsList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { selectedSquads } = useContext(DevFriendsContext);

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

  if (!isFetched) {
    return null;
  }

  if (devs.length === 0) {
    return <BlockingError title="No devs" content="No developers to display" />;
  }

  return (
    <>
      {devs.map((dev, index) => (
        <Dev key={index} onSelected={handleDevSelected} {...dev} />
      ))}
      <ChangeSquadModal
        isOpen={isModalOpen}
        dev={selectedDev}
        onClose={handleCloseModal}
      />
    </>
  );
};

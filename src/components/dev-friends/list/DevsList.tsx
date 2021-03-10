import React, { useContext, useState } from "react";
import { Dev as DevType } from "types/dev.interface";

import { useDevsBySquadQuery } from "@api/useDevsBySquadQuery";
import { useReportOnErrors } from "@components/dev-friends/hooks/useReportOnErrors";
import { useReportOnReady } from "@components/dev-friends/hooks/useReportOnReady";

import { ChangeSquadModal } from "../change-squad-modal/ChangeSquadModal";
import { DevFriendsContext } from "../contexts/DevFriendsContext";
import { Dev } from "./dev/Dev";

const useSelectionLogic = (
  devs: Array<DevType>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [selectedDev, setSelectedDev] = useState(undefined);

  const handleDevSelected = (id: number) => {
    setSelectedDev(devs.find((el) => el.id === id));
    setIsModalOpen(true);
  };

  return {
    handleDevSelected,
    selectedDev,
  };
};

export const DevsList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { selectedSquads } = useContext(DevFriendsContext);
  const { data: devs, isError } = useDevsBySquadQuery(selectedSquads);
  useReportOnErrors(isError);
  useReportOnReady(devs);
  const { selectedDev, handleDevSelected } = useSelectionLogic(
    devs,
    setIsModalOpen
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!devs) return null;

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

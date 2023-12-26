import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { useSquadsQuery } from '../../../../../api/main-backend';
import { selectedSquadsAtom } from '../../../../../state/selected-squads.atom';
import { useReportOnErrors } from '../../../hooks/useReportOnErrors';

export const useSquadsData = () => {
  const [, setSelectedSquads] = useAtom(selectedSquadsAtom);

  const { data: squads, isError, isFetched } = useSquadsQuery();

  useEffect(() => {
    if (squads) {
      setSelectedSquads(squads.map((s) => s.id));
    }
  }, [squads, setSelectedSquads]);

  useReportOnErrors(isError, isFetched, squads);

  return squads;
};

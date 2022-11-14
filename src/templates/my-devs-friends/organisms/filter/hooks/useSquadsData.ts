import { useAtom } from 'jotai';

import { useSquadsQuery } from '../../../../../api/main-backend';
import { selectedSquadsAtom } from '../../../../../state/selected-squads.atom';
import { useReportOnErrors } from '../../../hooks/useReportOnErrors';

export const useSquadsData = () => {
  const [, setSelectedSquads] = useAtom(selectedSquadsAtom);

  const {
    data: squads,
    isError,
    isFetched,
  } = useSquadsQuery({
    onSuccess: (data) => {
      setSelectedSquads(data.map((s) => s.id));
    },
  });

  useReportOnErrors(isError, isFetched, squads);

  return squads;
};

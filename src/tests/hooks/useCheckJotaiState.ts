import { useAtom } from 'jotai';

import { selectedSquadsAtom } from '../../state/selected-squads.atom';
import { uiStatusAtom } from '../../state/ui-status.atom';

export const useCheckJotaiState = () => {
  const [selectedSquads] = useAtom(selectedSquadsAtom);
  const [uiStatus] = useAtom(uiStatusAtom);

  return { selectedSquads, uiStatus };
};

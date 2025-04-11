import { useAtom } from 'jotai';
import { type ChangeEvent, useState } from 'react';

import type { SquadDto } from '../../../../../api/main-backend/specs/api-types';
import { selectedSquadsAtom } from '../../../../../state/selected-squads.atom';
import { uiStatusAtom } from '../../../../../state/ui-status.atom';

import { useSquadsData } from './useSquadsData';

export interface SquadsFilterFormHookResult {
  handleChange: (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
  formValues: boolean[];
  squads: SquadDto[] | undefined;
}

export const useSquadsFilterForm = (): SquadsFilterFormHookResult => {
  const [formValues, setFormValues] = useState([true, true, true, true]);
  const [, setUiStatus] = useAtom(uiStatusAtom);
  const [, setSelectedSquads] = useAtom(selectedSquadsAtom);

  const squads = useSquadsData();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    setUiStatus('loading');

    const index = parseInt(event.target.name, 10);
    if (Number.isNaN(index) || ![0, 1, 2, 3].includes(index)) {
      return;
    }

    const newValues = [...formValues];
    newValues[index] = checked;
    setFormValues(newValues);

    const selectedSquads = newValues.reduce<number[]>((prev, curr, index) => {
      if (curr) {
        return [...prev, index + 1];
      }

      return prev;
    }, []);

    setSelectedSquads(selectedSquads);
  };

  return { handleChange, formValues, squads };
};

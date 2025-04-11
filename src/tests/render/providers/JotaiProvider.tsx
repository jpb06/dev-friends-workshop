import type { Atom } from 'jotai';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import type { PropsWithChildren } from 'react';

import type { TestWrapper } from './types/test-wrapper.type';

const HydrateAtoms = ({ initialValues, children }) => {
  useHydrateAtoms(initialValues);
  return children;
};

export const JotaiProvider =
  (injectedValues: Iterable<readonly [Atom<unknown>, unknown]>): TestWrapper =>
  ({ children }: PropsWithChildren<unknown>) => (
    <Provider>
      <HydrateAtoms initialValues={injectedValues}>{children}</HydrateAtoms>
    </Provider>
  );

import type { Atom } from 'jotai';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import type { PropsWithChildren } from 'react';

import type React from 'react';
import type { TestWrapper } from './types/test-wrapper.type';

type HydrateAtomsProps = {
  initialValues: Iterable<readonly [Atom<unknown>, unknown]>;
  children: React.ReactNode;
};

const HydrateAtoms = ({ initialValues, children }: HydrateAtomsProps) => {
  useHydrateAtoms(initialValues as never);
  return children;
};

export const JotaiProvider =
  (injectedValues: Iterable<readonly [Atom<unknown>, unknown]>): TestWrapper =>
  ({ children }: PropsWithChildren<unknown>) => (
    <Provider>
      <HydrateAtoms initialValues={injectedValues}>{children}</HydrateAtoms>
    </Provider>
  );

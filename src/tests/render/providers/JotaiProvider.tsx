import { Atom, Provider } from 'jotai';
import React, { PropsWithChildren } from 'react';

import { TestWrapper } from './types/test-wrapper.type';

export const JotaiProvider =
  (injectedValues: Iterable<readonly [Atom<unknown>, unknown]>): TestWrapper =>
  ({ children }: PropsWithChildren<unknown>) =>
    <Provider initialValues={injectedValues}>{children}</Provider>;

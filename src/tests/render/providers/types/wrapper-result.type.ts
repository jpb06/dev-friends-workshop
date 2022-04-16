import { PropsWithChildren } from 'react';

export interface WrapperResult {
  wrapper: ({ children }: PropsWithChildren<unknown>) => JSX.Element;
}

import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import type { FunctionComponent, PropsWithChildren } from 'react';

import { GlobalIndicator } from '@molecules';

type ErrorBlockProps = PropsWithChildren<{
  title: string;
}>;

export const ErrorBlock: FunctionComponent<ErrorBlockProps> = ({
  title,
  children,
}: ErrorBlockProps) => (
  <GlobalIndicator title={title} Icon={SentimentDissatisfiedIcon}>
    {children}
  </GlobalIndicator>
);

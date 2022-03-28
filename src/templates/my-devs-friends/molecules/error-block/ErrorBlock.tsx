import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

import { GlobalIndicator } from '@molecules';

type ErrorBlockProps = {
  title: string;
  children: React.ReactNode;
};

export const ErrorBlock = ({ title, children }: ErrorBlockProps) => (
  <GlobalIndicator title={title} Icon={SentimentDissatisfiedIcon}>
    {children}
  </GlobalIndicator>
);

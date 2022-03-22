import { screen, render } from '@testing-library/react';

import { Brand } from './Brand';

describe('Brand component', () => {
  it('should display brand informations', () => {
    render(<Brand color="white" />);

    expect(screen.getByText('Sandbox')).toBeInTheDocument();
    expect(screen.getByText('storybook / msw')).toBeInTheDocument();
  });

  it('should display a brand icon', () => {
    render(<Brand color="white" />);

    expect(screen.getByTestId('BuildIcon')).toBeInTheDocument();
  });

  it('should display sandbox in small text', () => {
    render(<Brand color="white" big={false} />);

    expect(screen.getByText('Sandbox')).toHaveClass('MuiTypography-h6');
  });

  it('should display sandbox in big text', () => {
    render(<Brand color="white" big />);

    expect(screen.getByText('Sandbox')).toHaveClass('MuiTypography-h4');
  });

  it('should display centered content', () => {
    render(<Brand color="white" centered withBottomMargin />);

    expect(screen.getByText('Sandbox')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { when } from 'jest-when';
import React from 'react';

import { PageLayout } from './PageLayout';

describe('Page layout component', () => {
  it('should display its children', async () => {
    render(
      <PageLayout>
        <>child</>
      </PageLayout>
    );

    screen.getByText(/child/i);
  });

  it('should remove ssr styles', async () => {
    const removeChildMock = jest.fn(() => ({}));
    document.querySelector = jest.fn();
    when(document.querySelector)
      .calledWith('#jss-server-side')
      .mockReturnValue({
        parentElement: {
          removeChild: removeChildMock,
        },
      } as unknown as Element);

    render(
      <PageLayout>
        <>child</>
      </PageLayout>
    );

    expect(removeChildMock).toHaveBeenCalledTimes(1);
  });
});

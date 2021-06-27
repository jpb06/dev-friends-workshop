import React from 'react';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { devsMockData, squadsMockData } from '@tests/data';
import {
    mockApiChangeDevSquad, mockApiGetDevs, mockApiGetSquads, setupMswServer
} from '@tests/msw';
import { QueryProviderWrapper } from '@tests/wrappers';

import { ChangeSquadModal } from './ChangeSquadModal';

describe("Change squad modal component", () => {
  const { wrapper, queryClient } = QueryProviderWrapper();
  const dev = devsMockData[0];
  const handleClose = jest.fn();

  const { instance } = setupMswServer(
    mockApiGetDevs(devsMockData),
    mockApiGetSquads(squadsMockData),
    mockApiChangeDevSquad(devsMockData, squadsMockData)
  );
  beforeAll(() => instance.listen());
  afterEach(async () => {
    instance.resetHandlers();
    jest.resetAllMocks();
    queryClient.clear();
  });
  afterAll(() => instance.close());

  it("should display nothing if there is no dev", () => {
    render(<ChangeSquadModal isOpen onClose={handleClose} dev={null} />, {
      wrapper,
    });

    expect(
      screen.queryByRole("presentation", { name: /change-squad/i })
    ).not.toBeInTheDocument();
  });

  it("should display nothing if the modal is not opened", () => {
    render(
      <ChangeSquadModal isOpen={false} onClose={handleClose} dev={dev} />,
      { wrapper }
    );

    expect(
      screen.queryByRole("presentation", { name: /change-squad/i })
    ).not.toBeInTheDocument();
  });

  it("should display the modal", () => {
    render(<ChangeSquadModal isOpen onClose={handleClose} dev={dev} />, {
      wrapper,
    });

    screen.getByRole("presentation", { name: /change-squad/i });
    screen.getByRole("heading", { name: /Move Yolo man to another squad/i });
  });

  it("should display a loading indicator when modal first loads", () => {
    render(<ChangeSquadModal isOpen onClose={handleClose} dev={dev} />, {
      wrapper,
    });

    screen.getByRole("progressbar", { name: /circle-loading/i });
  });

  it("should display a list of squads", async () => {
    render(<ChangeSquadModal isOpen onClose={handleClose} dev={dev} />, {
      wrapper,
    });

    await screen.findByRole("list", { name: /squads list/i });
    screen.getByRole("button", { name: /squad 2 1 members/i });
    screen.getByRole("button", { name: /squad 5 0 members/i });

    screen.getByText(/yolo man currently belongs to squad 1/i);
  });

  it("should display a loading indicator when changing the dev squad", async () => {
    render(<ChangeSquadModal isOpen onClose={handleClose} dev={dev} />, {
      wrapper,
    });

    await screen.findByRole("list", { name: /squads list/i });

    const button = screen.getByRole("button", { name: /squad 2 1 members/i });
    userEvent.click(button);

    await screen.findByRole("progressbar", { name: /circle-loading/i });
  });

  it("should close the modal once the mutation has completed", async () => {
    render(<ChangeSquadModal isOpen onClose={handleClose} dev={dev} />, {
      wrapper,
    });

    await screen.findByRole("list", { name: /squads list/i });

    const button = screen.getByRole("button", { name: /squad 2 1 members/i });
    userEvent.click(button);

    await screen.findByRole("progressbar", { name: /circle-loading/i });

    await waitForElementToBeRemoved(() =>
      screen.queryByRole("progressbar", { name: /circle-loading/i })
    );

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("should close the modal", () => {
    render(<ChangeSquadModal isOpen onClose={handleClose} dev={dev} />, {
      wrapper,
    });

    const button = screen.getByRole("button", { name: /nevermind/i });
    userEvent.click(button);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});

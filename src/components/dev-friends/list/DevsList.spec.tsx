import React from 'react';

import { getDevDescription } from '@components/dev-friends/list/dev/logic/getDevDescription';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { devsMockData, squadsMockData } from '@tests/data';
import {
    mockApiChangeDevSquad, mockApiGetDevs, mockApiGetDevsBy, mockApiGetSquads, setupMswServer
} from '@tests/msw';
import { DevFriendContextAndQueryProviderWrapper } from '@tests/wrappers';

import { DevsList } from './DevsList';

const { wrapper, queryClient } = DevFriendContextAndQueryProviderWrapper(
  jest.fn(),
  jest.fn(),
  squadsMockData
);

describe("DevsList component", () => {
  const { instance } = setupMswServer(
    mockApiGetSquads(squadsMockData),
    mockApiGetDevs(devsMockData),
    mockApiChangeDevSquad(devsMockData, squadsMockData),
    mockApiGetDevsBy(devsMockData)
  );

  beforeAll(() => instance.listen());
  afterEach(async () => {
    instance.resetHandlers();
    queryClient.clear();
    jest.resetAllMocks();
  });
  afterAll(() => instance.close());

  it("should display nothing if there is no data", () => {
    instance.use(mockApiGetDevsBy([], 400));

    render(<DevsList />, { wrapper });

    expect(screen.queryAllByRole("dev")).toHaveLength(0);
  });

  it("should display nothing if there is no devs", () => {
    instance.use(mockApiGetDevsBy([]));

    render(<DevsList />, { wrapper });

    expect(screen.queryAllByRole("dev")).toHaveLength(0);
  });

  it("should display something when the search yielded no devs", async () => {
    instance.use(mockApiGetDevsBy([]));

    render(<DevsList />, { wrapper });

    await screen.findByText(/No developers to display/i);
  });

  it("should display a list of devs", async () => {
    instance.use(mockApiGetDevsBy(devsMockData));

    render(<DevsList />, { wrapper });

    const devs = await screen.findAllByRole("dev");
    expect(devs).toHaveLength(2);

    screen.getByRole("dev", {
      name: getDevDescription(devsMockData[0]),
    });
    screen.getByRole("dev", {
      name: getDevDescription(devsMockData[1]),
    });
  });

  it("should open the modal when a dev is selected", async () => {
    instance.use(mockApiGetDevsBy(devsMockData));

    render(<DevsList />, { wrapper });

    const button = await screen.findByRole("img", {
      name: devsMockData[0].firstName,
    });
    userEvent.click(button);

    await screen.findByRole("presentation", { name: /change-squad/i });
  });

  it("should close the modal", async () => {
    instance.use(mockApiGetDevsBy(devsMockData));

    render(<DevsList />, { wrapper });

    const devButton = await screen.findByRole("img", {
      name: devsMockData[0].firstName,
    });
    userEvent.click(devButton);

    await screen.findByRole("presentation", { name: /change-squad/i });

    const closeModalButton = screen.getByRole("button", { name: /nevermind/i });
    userEvent.click(closeModalButton);
  });
});

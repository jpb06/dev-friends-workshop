import React from "react";

import { getDevDescription } from "@components/dev-friends/list/dev/logic/getDevDescription";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { devsMockData } from "@tests/data/devs.data";
import { squadsMockData } from "@tests/data/squads.data";
import { mockApiChangeDevSquad } from "@tests/msw/api.changeDevSquad.mock";
import { mockApiGetDevs } from "@tests/msw/api.getDevs.mock";
import { mockApiGetDevsBy } from "@tests/msw/api.getDevsBy.mock";
import { mockApiGetSquads } from "@tests/msw/api.getSquads.mock";
import { DevFriendContextAndQueryProvidedWrapper } from "@tests/wrappers/DevFriendContextAndQueryProvided.wrapper";
import { setupMswServer } from "@tests/wrappers/setupMswServer";

import { DevsList } from "./DevsList";

const { wrapper, queryClient } = DevFriendContextAndQueryProvidedWrapper(
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

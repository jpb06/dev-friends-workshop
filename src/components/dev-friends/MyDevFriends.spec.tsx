import React from "react";

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { devsMockData, squadsMockData } from "@tests/data";
import { mockApiGetDevsBy, mockApiGetSquads, setupMswServer } from "@tests/msw";
import { QueryProviderWrapper } from "@tests/wrappers";

import { MyDevFriends } from "./MyDevFriends";

describe("My dev friends component", () => {
  const { wrapper, queryClient } = QueryProviderWrapper();

  const { instance } = setupMswServer(
    mockApiGetSquads(squadsMockData),
    mockApiGetDevsBy(devsMockData)
  );

  beforeAll(() => instance.listen());
  afterEach(() => {
    instance.resetHandlers();
    queryClient.resetQueries();
  });
  afterAll(() => instance.close());

  it("should display a loading indicator", () => {
    render(<MyDevFriends />, { wrapper });

    screen.getByRole("progressbar", { name: /circle-loading/i });
  });

  it("should display a list of devs once data has been fetched", async () => {
    render(<MyDevFriends />, { wrapper });

    await waitForElementToBeRemoved(() =>
      screen.queryByRole("progressbar", { name: /circle-loading/i })
    );
  });

  it("should display nothing if devs fetching failed", async () => {
    instance.use(mockApiGetDevsBy(devsMockData, 400));

    render(<MyDevFriends />, { wrapper });

    await waitForElementToBeRemoved(() =>
      screen.queryByRole("progressbar", { name: /circle-loading/i })
    );
  });
});

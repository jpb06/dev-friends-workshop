import React from "react";

import { screen } from "@testing-library/dom";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import { devsMockData } from "@tests/data/devs.data";
import { squadsMockData } from "@tests/data/squads.data";
import { mockApiGetDevsBy } from "@tests/msw/api.getDevsBy.mock";
import { mockApiGetSquads } from "@tests/msw/api.getSquads.mock";
import { QueryProviderWrapper } from "@tests/wrappers/QueryProvider.wrapper";
import { setupMswServer } from "@tests/wrappers/setupMswServer";

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

  it.only("should display a list of devs once data has been fetched", async () => {
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

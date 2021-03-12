import { setupServer } from "msw/node";

import { devsMockData } from "@tests/data";
import { mockApiGetDevsBy } from "@tests/msw";

import { getDevsBy } from "./getDevsBy";

describe("getDevsBy function", () => {
  const server = setupServer(mockApiGetDevsBy(devsMockData));

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should return devs", async () => {
    const devs = await getDevsBy([1]);

    expect(devs).toStrictEqual(devsMockData);
  });
});

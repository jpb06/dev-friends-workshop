import { setupServer } from "msw/node";

import { devsMockData } from "@tests/data";
import { mockApiGetDevs } from "@tests/msw";

import { getDevs } from "./getDevs";

describe("getDevs function", () => {
  const server = setupServer(mockApiGetDevs(devsMockData));

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should return devs", async () => {
    const devs = await getDevs();

    expect(devs).toStrictEqual(devsMockData);
  });
});

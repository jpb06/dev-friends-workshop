import { setupServer } from "msw/node";

import { squadsMockData } from "@tests/data/squads.data";
import { mockApiGetSquads } from "@tests/msw/api.getSquads.mock";

import { getSquads } from "./getSquads";

describe("getSquads function", () => {
  const server = setupServer(mockApiGetSquads(squadsMockData));

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should return squads", async () => {
    const devs = await getSquads();

    expect(devs).toStrictEqual(squadsMockData);
  });
});

import { setupServer } from "msw/node";

import { devsMockData } from "@tests/data/devs.data";
import { squadsMockData } from "@tests/data/squads.data";
import { mockApiChangeDevSquad } from "@tests/msw/api.changeDevSquad.mock";

import { changeDevSquad } from "./changeDevSquad";

describe("changeDevSquad function", () => {
  const server = setupServer(mockApiChangeDevSquad([], squadsMockData));

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should return 404 if the dev does not exist", async () => {
    const promise = changeDevSquad(devsMockData[0].id, squadsMockData[0].id);

    await expect(() => promise).rejects.toEqual({
      status: 404,
      data: "Dev not found",
    });
  });

  it("should return 404 if the squad does not exist", async () => {
    server.use(mockApiChangeDevSquad(devsMockData, []));

    const promise = changeDevSquad(devsMockData[0].id, 1);

    await expect(() => promise).rejects.toEqual({
      status: 404,
      data: "Squad not found",
    });
  });

  it("should return 200 if the call succeeds", async () => {
    server.use(mockApiChangeDevSquad(devsMockData, squadsMockData));

    const dev = devsMockData[0];
    const squad = squadsMockData[0];

    const result = await changeDevSquad(dev.id, squad.id);

    expect(result).toBe(`${dev.firstName} moved to squad ${squad.squad}`);
  });
});

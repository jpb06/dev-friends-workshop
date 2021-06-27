import { getDevDescription } from './getDevDescription';

describe("getDevDescription function", () => {
  it("should return a string describing the dev and his squad", () => {
    const description = getDevDescription({ firstName: "Yolo man", squad: 1 });

    expect(description).toBe("Yolo man - Squad 1");
  });
});

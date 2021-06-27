import { handleAxiosError } from './axios.errors.handler';

describe("handleAxiosError function", () => {
  it("should return 500 if there is no response", () => {
    expect.assertions(3);

    try {
      handleAxiosError({});
    } catch (err) {
      expect(err.message).toBe("Internal server error");
      expect(err.statusCode).toBe(500);
      expect(err.details).toBeUndefined();
    }
  });

  it("should return custom data", () => {
    expect.assertions(3);

    try {
      handleAxiosError({
        response: {
          status: 4001,
          data: {
            message: "Oh no!",
            details: "That's bad",
          },
        },
      });
    } catch (err) {
      expect(err.message).toBe("Oh no!");
      expect(err.statusCode).toBe(4001);
      expect(err.details).toBe("That's bad");
    }
  });
});

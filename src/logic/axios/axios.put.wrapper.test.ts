import { setupServer } from "msw/node";

import { CustomError } from "@owntypes/api.custom.error.interface";
import { genericPutUrl } from "@tests/api/config";
import {
  mswGenericPutFailure,
  mswGenericPutSuccess,
} from "@tests/msw/generic/msw.generic.put";

import { axiosPut } from "./axios.put.wrapper";

describe("Axios put wrapper", () => {
  const server = setupServer(mswGenericPutSuccess());

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should return the server response when the call succeeded", () => {
    const promise = axiosPut(genericPutUrl, {});

    expect(promise).resolves.toEqual({ message: "generic put" });
  });

  it("should return the server response when the call failed", async () => {
    server.use(mswGenericPutFailure());

    const promise = axiosPut(genericPutUrl, {});

    // using try catch here because we cannot throw an error due to react-query
    try {
      await promise;
    } catch (err) {
      expect(err).toStrictEqual(
        new CustomError(400, "generic put error message")
      );
    }
  });
});

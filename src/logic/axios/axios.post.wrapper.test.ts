import { setupServer } from "msw/node";

import { CustomError } from "@owntypes/api.custom.error.interface";
import { genericPostUrl } from "@tests/api/config";
import {
  mswGenericPostFailure,
  mswGenericPostSuccess,
} from "@tests/msw/generic/msw.generic.post";

import { axiosPost } from "./axios.post.wrapper";

describe("Axios post wrapper", () => {
  const server = setupServer(mswGenericPostSuccess());

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should return the server response when the call succeeded", () => {
    const promise = axiosPost(genericPostUrl, {});

    expect(promise).resolves.toEqual({ message: "generic post" });
  });

  it("should return the server response when the call failed", async () => {
    server.use(mswGenericPostFailure());

    const promise = axiosPost(genericPostUrl, {});

    // using try catch here because we cannot throw an error due to react-query
    try {
      await promise;
    } catch (err) {
      expect(err).toStrictEqual(
        new CustomError(400, "generic post error message")
      );
    }
  });
});

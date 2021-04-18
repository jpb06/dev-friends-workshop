import { setupServer } from "msw/node";

import { genericGetUrl } from "@tests/api/config";
import { mswGenericGetSuccess } from "@tests/msw/generic/msw.generic.get";

import { axiosGet } from "./axios.get.wrapper";

jest.mock("axios"),
  describe("Axios get wrapper", () => {
    const server = setupServer(mswGenericGetSuccess());

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("should return the server response when the call succeeded", () => {
      const promise = axiosGet(genericGetUrl);

      expect(promise).resolves.toEqual({ message: "generic get" });
    });
  });

import { genericPutUrl } from "@tests/api/config";
import { setupMswServer } from "@tests/msw";
import {
  mswGenericPutFailure,
  mswGenericPutSuccess,
} from "@tests/msw/generic/msw.generic.put";

import { handleAxiosError } from "./axios.errors.handler";
import { axiosPut } from "./axios.put.wrapper";

jest.mock("./axios.errors.handler");

describe("Axios put wrapper", () => {
  const { instance } = setupMswServer();

  beforeAll(() => instance.listen());
  afterEach(() => {
    instance.resetHandlers();
    jest.clearAllMocks();
  });
  afterAll(() => instance.close());

  it("should return the server response when the call succeeded", async () => {
    instance.use(mswGenericPutSuccess());

    const result = await axiosPut(genericPutUrl, {});

    expect(result).toStrictEqual({ message: "generic put" });
  });

  it("should call handleAxiosError if there is an error", async () => {
    instance.use(mswGenericPutFailure());

    await axiosPut(genericPutUrl, {});

    expect(handleAxiosError).toHaveBeenCalledTimes(1);
  });
});

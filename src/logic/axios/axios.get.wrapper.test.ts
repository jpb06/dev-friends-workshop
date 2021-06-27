import { genericGetUrl } from '@tests/api/config';
import { setupMswServer } from '@tests/msw';
import { mswGenericGetFailure, mswGenericGetSuccess } from '@tests/msw/generic/msw.generic.get';

import { handleAxiosError } from './axios.errors.handler';
import { axiosGet } from './axios.get.wrapper';

jest.mock("./axios.errors.handler");

describe("Axios get wrapper", () => {
  const { instance } = setupMswServer();

  beforeAll(() => instance.listen());
  afterEach(() => instance.resetHandlers());
  afterAll(() => instance.close());

  it("should return the server response when the call succeeded", async () => {
    instance.use(mswGenericGetSuccess());

    const result = await axiosGet(genericGetUrl, {});

    expect(result).toStrictEqual({ message: "generic get" });
  });

  it("should return the server response when the call failed", async () => {
    instance.use(mswGenericGetFailure());

    await axiosGet(genericGetUrl, {});

    expect(handleAxiosError).toHaveBeenCalledTimes(1);
  });
});

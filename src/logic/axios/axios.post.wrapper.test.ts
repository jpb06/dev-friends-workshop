import { genericPostUrl } from "@tests/api/config";
import { setupMswServer } from "@tests/msw";
import {
  mswGenericPostFailure,
  mswGenericPostSuccess,
} from "@tests/msw/generic/msw.generic.post";

import { handleAxiosError } from "./axios.errors.handler";
import { axiosPost } from "./axios.post.wrapper";

jest.mock("./axios.errors.handler");

describe("Axios post wrapper", () => {
  const { instance } = setupMswServer();

  beforeAll(() => instance.listen());
  afterEach(() => {
    instance.resetHandlers();
    jest.clearAllMocks();
  });
  afterAll(() => instance.close());

  it("should return the server response when the call succeeded", async () => {
    instance.use(mswGenericPostSuccess());

    const result = await axiosPost(genericPostUrl, {});

    expect(result).toStrictEqual({ message: "generic post" });
  });

  it("should return the server response when the call failed", async () => {
    instance.use(mswGenericPostFailure());

    await axiosPost(genericPostUrl, {});

    expect(handleAxiosError).toHaveBeenCalledTimes(1);
  });
});

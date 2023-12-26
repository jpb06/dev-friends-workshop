import { describe, it, expect } from 'vitest';

import { axiosRequest } from './axios-request';
import { getHandler } from './get.msw-handler';

describe('axiosRequest function', () => {
  const path = '/get';
  const data = 'cool';
  const method = 'GET';

  it('should throw on axios errors', async () => {
    await getHandler(500, data);

    await expect(
      axiosRequest({
        url: path,
        method,
      }),
    ).rejects.toStrictEqual(data);
  });

  it('should throw an error if there is no result', async () => {
    await getHandler(200, {});

    await expect(
      axiosRequest({
        url: path,
        method,
      }),
    ).rejects.toThrow(`${method} ${path} returned no result`);
  });

  it('should return result', async () => {
    await getHandler(200, {
      result: data,
    });

    const result = await axiosRequest({
      url: path,
      method: 'GET',
    });

    expect(result).toStrictEqual(data);
  });
});

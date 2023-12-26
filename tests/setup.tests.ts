import '@testing-library/jest-dom/vitest';
import { loadEnvConfig } from '@next/env';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, afterAll, vi } from 'vitest';

loadEnvConfig('.');

import { server } from '../src/tests/msw/server';

vi.mock('@logic/delay');

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());

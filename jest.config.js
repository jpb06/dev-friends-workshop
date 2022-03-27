const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

/**
 * @type {import('@jest/types').Config.ProjectConfig}
 **/
// Add any custom config to be passed to Jest
const customJestConfig = {
  rootDir: '.',
  globalSetup: '<rootDir>/jest/jest.setup.env.ts',
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/jest/modules-mappers/file.stub.ts',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@msw$': '<rootDir>/src/api/main-backend/msw-handlers.ts',
    '^@templates$': '<rootDir>/src/templates',
    '^@organisms$': '<rootDir>/src/organisms',
    '^@molecules$': '<rootDir>/src/molecules',
    '^@providers$': '<rootDir>/src/providers',
    '^@logic/(.*)$': '<rootDir>/src/logic/$1',
    '^@tests/(.*)$': '<rootDir>/src/tests/$1',
    '^@theme$': '<rootDir>/src/theme',
  },
  testEnvironment: 'jest-environment-jsdom',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  collectCoverageFrom: [
    './src/**/*.{ts,tsx}',
    '!./src/api/main-backend/**',
    '!./src/api/msw.handlers.ts',
    '!./src/api/**/*.msw-handler.ts',
    '!./src/api/**/msw-handlers.ts',
    '!./src/tests/**',
    '!./src/**/mock-data/**',
    '!./src/pages/**',
    '!./src/providers/**',
    '!**/*.d.ts',
    '!**/index.ts',
    '!**/*.type.ts',
  ],
  coverageReporters: ['json-summary', 'text', 'lcov'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

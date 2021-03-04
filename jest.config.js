const { pathsToModuleNameMapper } = require("ts-jest/utils");
const {
  compilerOptions: { paths: tsconfigPaths },
} = require("./tsconfig");

module.exports = {
  roots: ["<rootDir>/src/"],
  globalSetup: '<rootDir>/jest.setup.env.ts',
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
  testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules|.next|coverage)[/\\\\]"],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "test-file-stub",
    ...pathsToModuleNameMapper(tsconfigPaths, { prefix: "<rootDir>/src" }),
  },
  coveragePathIgnorePatterns: ["<rootDir>/src/tests-related/", "<rootDir>/src/types/", "<rootDir>/src/pages/"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
  ],
  coverageReporters: ['json-summary', 'text', 'lcov']
};

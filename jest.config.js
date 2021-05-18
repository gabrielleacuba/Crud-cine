module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/src/*.{js,jsx,ts,tsx}",
    "!<rootDir>/src/components/Layout.{js,jsx,ts,tsx}",
    "!<rootDir>/src/styles/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/src/config/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/src/pages/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/src/redux/store.{js,jsx,ts,tsx}",
    "!<rootDir>/src/redux/reducers/index.{js,jsx,ts,tsx}",
    "!<rootDir>/**/stories.{js,jsx,ts,tsx}",
    "!<rootDir>/src/templates/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/node_modules/",
  ],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
};

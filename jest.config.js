module.exports = {
  // preset: "@shelf/jest-mongodb",
  setupFiles: ["dotenv/config"],
  collectCoverageFrom: [
    "integration-test/**/*.js",
    "server/**/*.js",
    "!/node_modules/",
  ],
  projects: [
    {
      displayName: "backend",
      testEnvironment: "node",
      testMatch: ["<rootDir>/**/*.test.js"],
      testPathIgnorePatterns: ["<rootDir>/frontend/"],
    },
    {
      displayName: "frontend",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/frontend/src/**/*.test.js"],
      moduleFileExtensions: ["js"],
      moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
          "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
      },
    },
  ],
};

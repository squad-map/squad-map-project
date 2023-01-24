module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePaths: ['<rootdir>/src'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.png|svg$': 'jest-transform-stub',
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['./setupTests.js'],
};

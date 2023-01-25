module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePaths: ['<rootdir>/src'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.png|svg$': 'jest-transform-stub',
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['./setupTests.js'],
};

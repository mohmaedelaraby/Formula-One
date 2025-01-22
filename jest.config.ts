import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest preset for TypeScript projects
  testEnvironment: 'jest-environment-jsdom', // Specify the environment explicitly
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest to transform TypeScript files
    '^.+\\.(js|jsx)$': 'babel-jest', // Optional, use babel-jest for JS files
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'], // Add jest-dom matchers directly here
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy', // Handle CSS/LESS/SCSS imports
  },
};

export default config;

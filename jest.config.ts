import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  moduleNameMapper : {
    "@/(.*)$" : "<rootDir>/src/$1"
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
};
export default config;

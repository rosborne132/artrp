import type { Config } from '@jest/types'
import { defaults } from 'jest-config'

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  }
}

// filepath: c:\Users\talent.tinaapi\Downloads\Reusable Game Suite\project\tests\game-test-utils.ts
import { test as baseTest } from '@playwright/test';

type GameTestFixtures = {
  setup: () => Promise<void>;
  verifyGameLaunch: () => Promise<void>;
  navigatePaytable: () => Promise<void>;
  controlSound: () => Promise<void>;
  accessHelpFiles: () => Promise<void>;
  completeSpin: () => Promise<void>;
};

export const test = baseTest.extend<{
  gameTest: GameTestFixtures;
}>({
  gameTest: async ({}, use) => {
    // Shared setup logic for game tests
    await use({
      setup: async () => {
        // Setup logic
      },
      verifyGameLaunch: async () => {
        // Verification logic
      },
      navigatePaytable: async () => {
        // Navigation logic
      },
      controlSound: async () => {
        // Sound control logic
      },
      accessHelpFiles: async () => {
        // Help file access logic
      },
      completeSpin: async () => {
        // Spin completion logic
      },
    });
  },
});
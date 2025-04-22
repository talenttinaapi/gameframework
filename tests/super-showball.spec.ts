import { expect } from '@playwright/test';
import { test } from './game-test-utils';

test.describe('Super Showball Mystery Link&Win Game Tests', () => {
  test.beforeEach(async ({ gameTest }) => {
    await gameTest.setup();
  });

  test('should launch game successfully', async ({ gameTest }) => {
    await gameTest.verifyGameLaunch();
  });

  test('should open and navigate paytable', async ({ gameTest }) => {
    await gameTest.navigatePaytable();
  });

  test('should control game sound', async ({ gameTest }) => {
    await gameTest.controlSound();
  });

  test('should access help files', async ({ gameTest }) => {
    await gameTest.accessHelpFiles();
  });

  test('should complete a spin successfully', async ({ gameTest }) => {
    await gameTest.completeSpin();
  });
});
import { expect } from '@playwright/test';
import { test } from './game-test-utils';

test.describe('Buck Bucks Bagawk Game Tests', () => {
  test.use({ baseURL: 'https://mobile-app1-gtp112.installprogram.eu/htmlGames/4.25.0/launch/buckBucksBagawk_Lume_2_0_0_41/mgs/buckBucksBagawk?displayName=Buck+Bucks+Bagawk%e2%84%a2&moduleId=100899&clientId=50300&gamePath=/mgs/buckBucksBagawk&clientTypeId=70&gameId=buckBucksBagawkV92Desktop&languageCode=en&productId=5007&market=dotcom&brand=islandparadise&loginType=InterimUPE&returnUrl=https://mobile-app1-gtp112.installprogram.eu/lobby/en/IslandParadise/games/&routerEndPoints=&currencyFormat=&isPracticePlay=False&username=talent112&password=test1234$&formFactor=desktop' });
  test.beforeEach(async ({ gameTest }) => {
    await gameTest.setup();
  });

  
  test('should launch game successfully', async ({ page }) => {
    // Wait for loading screen to disappear (if applicable)
    await page.waitForSelector('.new-loading-screen-class', { state: 'hidden', timeout: 10000 });
  
    // Verify essential game elements are present
    await expect(page.locator('canvas')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.new-game-container-class')).toBeVisible();
  
    // Verify game is in a playable state
    await expect(page.locator('.new-loading-screen-class')).not.toBeVisible();
    await expect(page.locator('.new-error-message-class')).not.toBeVisible();
  
    // Verify initial balance is displayed
    const balanceElement = page.locator('.new-balance-display-class');
    await expect(balanceElement).toBeVisible();
    const balance = await balanceElement.textContent();
    expect(parseFloat(balance || '0')).toBeGreaterThan(0);
  });
  /*st('should open and navigate paytable', async ({ gameTest }) => {
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
  });*/
});
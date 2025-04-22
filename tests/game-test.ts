import { test, expect, Page } from '@playwright/test';

test.describe('Super Showball Mystery Link&Win Game Tests', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://mobile-app1-gtp178.installprogram.eu/htmlGames/4.23.0/launch/superShowballMysteryLinkWinDesktop_Cocos_1_2_1_4/NekoGames/superShowballMysteryLinkWinDesktop?displayName=Super+Showball+Mystery%e2%84%a2+Link%26Win%e2%84%a2&moduleId=101883&clientId=50300&gamePath=/nekoGames/superShowballMysteryLinkWinDesktop&clientTypeId=70&gameId=superShowballMysteryLinkWinDesktop&languageCode=en&productId=5007&market=dotcom&brand=islandparadise&loginType=InterimUPE&returnUrl=https://mobile-app1-gtp178.installprogram.eu/lobby/en/IslandParadise/games/&routerEndPoints=¤cyFormat=&isPracticePlay=False&username=talent178&password=test1234$&formFactor=desktop');
    
    // Wait for game to load completely
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('canvas', { state: 'visible' });
  });

  test('should launch game successfully', async () => {
    // Verify essential game elements are present
    await expect(page.locator('canvas')).toBeVisible();
    await expect(page.locator('.game-container')).toBeVisible();
    
    // Verify game is in a playable state
    await expect(page.locator('.loading-screen')).not.toBeVisible();
    await expect(page.locator('.error-message')).not.toBeVisible();
    
    // Verify initial balance is displayed
    const balanceElement = page.locator('.balance-display');
    await expect(balanceElement).toBeVisible();
    const balance = await balanceElement.textContent();
    expect(parseFloat(balance || '0')).toBeGreaterThan(0);
  });

  test('should open and navigate paytable', async () => {
    // Open paytable
    const paytableButton = page.locator('.paytable-button');
    await expect(paytableButton).toBeVisible();
    await paytableButton.click();
    
    // Verify paytable is displayed
    const paytableContainer = page.locator('.paytable-container');
    await expect(paytableContainer).toBeVisible();
    
    // Navigate through paytable pages
    const nextButton = page.locator('.paytable-next');
    const prevButton = page.locator('.paytable-prev');
    
    await nextButton.click();
    await expect(page.locator('.paytable-page-2')).toBeVisible();
    
    await prevButton.click();
    await expect(page.locator('.paytable-page-1')).toBeVisible();
    
    // Close paytable
    const closeButton = page.locator('.paytable-close');
    await closeButton.click();
    await expect(paytableContainer).not.toBeVisible();
  });

  test('should control game sound', async () => {
    // Locate sound button
    const soundButton = page.locator('.sound-button');
    await expect(soundButton).toBeVisible();
    
    // Mute sound
    await soundButton.click();
    await expect(soundButton).toHaveClass(/muted/);
    
    // Unmute sound
    await soundButton.click();
    await expect(soundButton).not.toHaveClass(/muted/);
  });

  test('should access help files', async () => {
    // Open help section
    const helpButton = page.locator('.help-button');
    await expect(helpButton).toBeVisible();
    await helpButton.click();
    
    // Verify help content is displayed
    const helpContainer = page.locator('.help-container');
    await expect(helpContainer).toBeVisible();
    
    // Verify help content is readable
    const helpContent = page.locator('.help-content');
    await expect(helpContent).toContainText(/Game Rules/);
    
    // Close help
    const closeHelpButton = page.locator('.help-close');
    await closeHelpButton.click();
    await expect(helpContainer).not.toBeVisible();
  });

  test('should complete a spin successfully', async () => {
    // Get initial balance
    const balanceElement = page.locator('.balance-display');
    const initialBalance = await balanceElement.textContent();
    
    // Locate and click spin button
    const spinButton = page.locator('.spin-button');
    await expect(spinButton).toBeVisible();
    await expect(spinButton).toBeEnabled();
    await spinButton.click();
    
    // Verify spin is in progress
    await expect(spinButton).toBeDisabled();
    await expect(page.locator('.reels')).toHaveClass(/spinning/);
    
    // Wait for spin to complete
    await page.waitForSelector('.reels:not(.spinning)', { timeout: 30000 });
    
    // Verify spin completed
    await expect(spinButton).toBeEnabled();
    
    // Verify balance has changed
    const finalBalance = await balanceElement.textContent();
    expect(finalBalance).not.toBe(initialBalance);
  });

  test.afterEach(async () => {
    await page.close();
  });
});
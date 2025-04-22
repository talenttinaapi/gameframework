import { test as base, expect, Page, Locator } from '@playwright/test';

export class BaseGameTest {
  readonly page: Page;
  readonly gameUrl: string;
  
  // Game elements that should be overridden by specific game implementations
  protected selectors = {
    canvas: 'canvas',
    gameContainer: '.game-container',
    loadingScreen: '.loading-screen',
    errorMessage: '.error-message',
    balanceDisplay: '.balance-display',
    spinButton: '.spin-button',
    reels: '.reels',
    paytableButton: '.paytable-button',
    paytableContainer: '.paytable-container',
    paytableNext: '.paytable-next',
    paytablePrev: '.paytable-prev',
    paytableClose: '.paytable-close',
    paytablePage1: '.paytable-page-1',
    paytablePage2: '.paytable-page-2',
    soundButton: '.sound-button',
    helpButton: '.help-button',
    helpContainer: '.help-container',
    helpContent: '.help-content',
    helpClose: '.help-close'
  };

  constructor(page: Page, gameUrl: string) {
    this.page = page;
    this.gameUrl = gameUrl;
  }

  async setup() {
    await this.page.goto(this.gameUrl);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector(this.selectors.canvas, { state: 'visible' });
  }

  async verifyGameLaunch() {
    await expect(this.page.locator(this.selectors.canvas)).toBeVisible();
    await expect(this.page.locator(this.selectors.gameContainer)).toBeVisible();
    await expect(this.page.locator(this.selectors.loadingScreen)).not.toBeVisible();
    await expect(this.page.locator(this.selectors.errorMessage)).not.toBeVisible();
    
    const balanceElement = this.page.locator(this.selectors.balanceDisplay);
    await expect(balanceElement).toBeVisible();
    const balance = await balanceElement.textContent();
    expect(parseFloat(balance || '0')).toBeGreaterThan(0);
  }

  async navigatePaytable() {
    const paytableButton = this.page.locator(this.selectors.paytableButton);
    await expect(paytableButton).toBeVisible();
    await paytableButton.click();
    
    const paytableContainer = this.page.locator(this.selectors.paytableContainer);
    await expect(paytableContainer).toBeVisible();
    
    const nextButton = this.page.locator(this.selectors.paytableNext);
    const prevButton = this.page.locator(this.selectors.paytablePrev);
    
    await nextButton.click();
    await expect(this.page.locator(this.selectors.paytablePage2)).toBeVisible();
    
    await prevButton.click();
    await expect(this.page.locator(this.selectors.paytablePage1)).toBeVisible();
    
    const closeButton = this.page.locator(this.selectors.paytableClose);
    await closeButton.click();
    await expect(paytableContainer).not.toBeVisible();
  }

  async controlSound() {
    const soundButton = this.page.locator(this.selectors.soundButton);
    await expect(soundButton).toBeVisible();
    
    await soundButton.click();
    await expect(soundButton).toHaveClass(/muted/);
    
    await soundButton.click();
    await expect(soundButton).not.toHaveClass(/muted/);
  }

  async accessHelpFiles() {
    const helpButton = this.page.locator(this.selectors.helpButton);
    await expect(helpButton).toBeVisible();
    await helpButton.click();
    
    const helpContainer = this.page.locator(this.selectors.helpContainer);
    await expect(helpContainer).toBeVisible();
    
    const helpContent = this.page.locator(this.selectors.helpContent);
    await expect(helpContent).toContainText(/Game Rules/);
    
    const closeHelpButton = this.page.locator(this.selectors.helpClose);
    await closeHelpButton.click();
    await expect(helpContainer).not.toBeVisible();
  }

  async completeSpin() {
    const balanceElement = this.page.locator(this.selectors.balanceDisplay);
    const initialBalance = await balanceElement.textContent();
    
    const spinButton = this.page.locator(this.selectors.spinButton);
    await expect(spinButton).toBeVisible();
    await expect(spinButton).toBeEnabled();
    await spinButton.click();
    
    await expect(spinButton).toBeDisabled();
    await expect(this.page.locator(this.selectors.reels)).toHaveClass(/spinning/);
    
    await this.page.waitForSelector(`${this.selectors.reels}:not(.spinning)`, { timeout: 30000 });
    
    await expect(spinButton).toBeEnabled();
    
    const finalBalance = await balanceElement.textContent();
    expect(finalBalance).not.toBe(initialBalance);
  }
}

// Create a test fixture that provides the BaseGameTest
export const test = base.extend<{ gameTest: BaseGameTest }>({
  gameTest: async ({ page }, use) => {
    const gameTest = new BaseGameTest(page, 'https://mobile-app1-gtp178.installprogram.eu/htmlGames/4.23.0/launch/superShowballMysteryLinkWinDesktop_Cocos_1_2_1_4/NekoGames/superShowballMysteryLinkWinDesktop?displayName=Super+Showball+Mystery%e2%84%a2+Link%26Win%e2%84%a2&moduleId=101883&clientId=50300&gamePath=/nekoGames/superShowballMysteryLinkWinDesktop&clientTypeId=70&gameId=superShowballMysteryLinkWinDesktop&languageCode=en&productId=5007&market=dotcom&brand=islandparadise&loginType=InterimUPE&returnUrl=https://mobile-app1-gtp178.installprogram.eu/lobby/en/IslandParadise/games/&routerEndPoints=¤cyFormat=&isPracticePlay=False&username=talent178&password=test1234$&formFactor=desktop');
    await use(gameTest);
  }
});

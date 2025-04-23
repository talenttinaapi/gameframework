import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://mobile-app1-gtp112.installprogram.eu/htmlGames/4.25.0/launch/buckBucksBagawk_Lume_2_0_0_41/mgs/buckBucksBagawk?displayName=Buck+Bucks+Bagawk%e2%84%a2&moduleId=100899&clientId=50300&gamePath=/mgs/buckBucksBagawk&clientTypeId=70&gameId=buckBucksBagawkV92Desktop&languageCode=en&productId=5007&market=dotcom&brand=islandparadise&loginType=InterimUPE&returnUrl=https://mobile-app1-gtp112.installprogram.eu/lobby/en/IslandParadise/games/&routerEndPoints=¤cyFormat=&isPracticePlay=False&username=talent112&password=test1234$&formFactor=desktop');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Buck Bucks Bagawk/);
});

test('canvas element test', async ({ page }) => {
  await page.goto('https://mobile-app1-gtp112.installprogram.eu/htmlGames/4.25.0/launch/buckBucksBagawk_Lume_2_0_0_41/mgs/buckBucksBagawk?displayName=Buck+Bucks+Bagawk%e2%84%a2&moduleId=100899&clientId=50300&gamePath=/mgs/buckBucksBagawk&clientTypeId=70&gameId=buckBucksBagawkV92Desktop&languageCode=en&productId=5007&market=dotcom&brand=islandparadise&loginType=InterimUPE&returnUrl=https://mobile-app1-gtp112.installprogram.eu/lobby/en/IslandParadise/games/&routerEndPoints=&currencyFormat=&isPracticePlay=False&username=talent112&password=test1234$&formFactor=desktop');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

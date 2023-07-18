/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const HomePage = require('../pageobjects/home.page');

describe('enter home', () => {
  beforeAll(() => {
    browser.setWindowSize(1360, 768);
    browser.url('https://nico-megarocket-app.vercel.app/auth');
  });

  it('Tittles and buttons displayed', async () => {
    await expect(HomePage.navBtn[0]).toBeDisplayed();
    await expect(HomePage.navBtn[0]).toBeClickable();
    await expect(HomePage.navBtn[1]).toBeDisplayed();
    await expect(HomePage.navBtn[1]).toBeClickable();
    await expect(HomePage.navBtn[2]).toBeDisplayed();
    await expect(HomePage.navBtn[2]).toBeClickable();
    await expect(HomePage.mainTitle).toBeDisplayed();
    await expect(HomePage.secondTitle).toBeDisplayed();
    await expect(HomePage.sectionFeatures).toBeDisplayed();
    await expect(HomePage.sectionActivities).toBeDisplayed();
    await expect(HomePage.sectionMemberships).toBeDisplayed();
    await expect(HomePage.sectionContact).toBeDisplayed();
  });
});

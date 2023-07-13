/* eslint-disable no-undef */
const HomePage = require('../pageobjects/home.page.js');
const LoginPage = require('../pageobjects/login.page.js');
const AdminClassesPage = require('../pageobjects/admin.page.js');

describe('My Correct Login application', () => {
  beforeAll('Visit Main Page', () => {
    browser.url('https://nico-megarocket-app.vercel.app/auth');
  });

  it('should login as an admin', async () => {
    await expect(HomePage.navBtn[1]).toBeDisplayed();
    await HomePage.navBtn[1].click();
    await LoginPage.login('carlaperee@gmail.com', 'Password1');
    await AdminClassesPage.addBtnClass.waitForDisplayed();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/admin');
  });
});

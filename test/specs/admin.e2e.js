/* eslint-disable no-undef */
const HomePage = require('../pageobjects/home.page.js');
const LoginPage = require('../pageobjects/login.page.js');

describe('My Login application', () => {
  beforeAll('Visit Main Page', () => {
    browser.url('https://nico-megarocket-app.vercel.app/auth');
  });

  it('should go to login page', async () => {
    await expect(HomePage.navBtn[1]).toBeDisplayed();
    await HomePage.navBtn[1].click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/auth/login');
  });

  it('should show me required fields', async () => {
    await expect(LoginPage.enterBtn).toBeDisplayed();
    await LoginPage.enterBtn.click();
    await expect(LoginPage.emailError).toBeDisplayed();
    await expect(LoginPage.pswError).toBeDisplayed();
    expect(LoginPage.emailError).toHaveTextContaining('The email is a required field');
    expect(LoginPage.pswError).toHaveTextContaining('The password is a required field');
  });
});

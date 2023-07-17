/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const HomePage = require('../pageobjects/home.page.js');
const Login = require('../pageobjects/login.page.js');
const TrainerPage = require('../pageobjects/trainer.page.js');

describe('login trainer', () => {
  beforeAll(() => {
    browser.setWindowSize(1360, 768);
    browser.url('https://nico-megarocket-app.vercel.app/auth');
  });

  it('success process', async () => {
    await expect(HomePage.navBtn[1]).toBeDisplayed();
    await expect(HomePage.navBtn[1]).toBeClickable();
    await HomePage.navBtn[1].click();
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl === 'https://nico-megarocket-app.vercel.app/auth/login';
      },
      { timeout: 3000, timeoutMsg: 'The URL do not change when I click.' }
    );
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/auth/login');
  });

  it('Login succes', async () => {
    await Login.loginForm('barbi.millanoide@gmail.com', 'Lalala1234');
    await expect(Login.loginBtn).waitForDisplay();
    await Login.loginBtnClick();
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl === 'https://nico-megarocket-app.vercel.app/trainer';
      },
      { timeout: 3000, timeoutMsg: 'The URL do not change when I click.' }
    );
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/trainer');
  });

  it('See classes', async () => {
    await expect(TrainerPage.navBtn[0]).toBeDisplayed();
    await expect(TrainerPage.navBtn[0]).toBeClickable();
    await TrainerPage.navBtn[0].click();
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl === 'https://nico-megarocket-app.vercel.app/auth/trainer/classes';
      },
      { timeout: 3000, timeoutMsg: 'The URL do not change when I click.' }
    );
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/trainer/classes');
  });

  it('See profile', async () => {
    await expect(TrainerPage.navBtn[1]).toBeDisplayed();
    await expect(TrainerPage.navBtn[1]).toBeClickable();
    await TrainerPage.navBtn[1].click();
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl === 'https://nico-megarocket-app.vercel.app/trainer/profile';
      },
      { timeout: 3000, timeoutMsg: 'The URL do not change when I click.' }
    );
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/trainer/profile');
    await expect(TrainerPage.logoutBtn).toBeClickable();
    await TrainerPage.logoutBtnClick();
  });
});

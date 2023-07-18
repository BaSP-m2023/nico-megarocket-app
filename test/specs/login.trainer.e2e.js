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

  it('success process enter to login page', async () => {
    await expect(HomePage.navBtn[1]).toBeDisplayed();
    await expect(HomePage.navBtn[1]).toBeClickable();
    await HomePage.navBtn[1].click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/auth/login');
  });

  it('Login succes', async () => {
    await Login.login('barbitrainer@gmail.com', 'Password1');
    await Login.enterBtn.waitForDisplayed();
    await Login.enterBtnClick();
    await TrainerPage.textTittle.waitForDisplayed();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/trainer/classes');
  });

  it('See classes', async () => {
    await expect(TrainerPage.navBtn[0]).toBeDisplayed();
    await expect(TrainerPage.navBtn[0]).toBeClickable();
    await TrainerPage.navBtn[0].click();
  });

  it('See and edit profile', async () => {
    await expect(TrainerPage.navBtn[1]).toBeDisplayed();
    await expect(TrainerPage.navBtn[1]).toBeClickable();
    await TrainerPage.navBtn[1].click();
    await TrainerPage.infoProfile.waitForDisplayed();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/trainer/profile');
    await TrainerPage.editProfileBtnClick();
    await TrainerPage.saveBtn.waitForDisplayed();
    await TrainerPage.resetBtn.waitForDisplayed();
    await TrainerPage.cancelBtn.waitForDisplayed();
    await TrainerPage.cancelBtnClick();
    await expect(TrainerPage.logoutBtn).toBeClickable();
    await TrainerPage.logoutBtnClick();
  });
});

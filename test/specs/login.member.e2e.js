/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const HomePage = require('../pageobjects/home.page.js');
const Login = require('../pageobjects/login.page.js');
const MemberPage = require('../pageobjects/member.page.js');

describe('login member', () => {
  beforeAll(() => {
    browser.setWindowSize(1360, 768);
    browser.url('https://nico-megarocket-app.vercel.app/auth');
  });

  it('success process enter to login page', async () => {
    await expect(HomePage.navBtn[1]).toBeDisplayed();
    await expect(HomePage.navBtn[1]).toBeClickable();
    await HomePage.navBtn[1].click();
    await expect(Login.emailLabel).toBeDisplayed();
    await expect(Login.passwordLabel).toBeDisplayed();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/auth/login');
  });

  it('Login with all inputs empty', async () => {
    await Login.login('', '');
    await expect(Login.enterBtn).toBeDisplayed();
    await expect(Login.enterBtn).toBeClickable();
    await Login.enterBtnClick();
    const errorEmailText = await Login.emailError.getText();
    expect(errorEmailText).toEqual('The email is a required field');
    const errorPasswordText = await Login.pswError.getText();
    expect(errorPasswordText).toEqual('The password field is required');
  });

  it('Login with incorrect user', async () => {
    await Login.login('barbi@gmail.com', 'Hola12365');
    await expect(Login.enterBtn).toBeDisplayed();
    await Login.enterBtnClick();
    const loginDenied = await Login.loginErrorMsg.getText();
    expect(loginDenied).toEqual('The username or password is incorrect');
  });

  it('Login succes', async () => {
    await Login.login('memberfive@gmail.com', 'Password1');
    await expect(Login.enterBtn).toBeDisplayed();
    await Login.enterBtnClick();
    await MemberPage.textTittle.waitForDisplayed();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/member/classes');
  });

  it('See and join classes', async () => {
    await expect(MemberPage.classesContainer).toBeDisplayed();
    await MemberPage.selectClasses.selectByIndex(6);
    await expect(MemberPage.classesContainer).toHaveTextContaining('Piscina');
    await MemberPage.classesContainer.click();
    await MemberPage.joinButton.waitForDisplayed();
    await MemberPage.joinButton.click();
  });

  it('See activities', async () => {
    await expect(MemberPage.navBtn[1]).toBeDisplayed();
    await expect(MemberPage.navBtn[1]).toBeClickable();
    await MemberPage.navBtn[1].click();
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl === 'https://nico-megarocket-app.vercel.app/member/activities';
      },
      { timeout: 3000, timeoutMsg: 'The URL do not change when I click.' }
    );
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/member/activities');
    await expect(MemberPage.furboCard).toBeDisplayed();
    await expect(MemberPage.boxingCard).toBeDisplayed();
    await expect(MemberPage.piscinaCard).toBeDisplayed();
    await expect(MemberPage.baseballCard).toBeDisplayed();
    await expect(MemberPage.javascriptCard).toBeDisplayed();
    await expect(MemberPage.handballCard).toBeDisplayed();
    await expect(MemberPage.picapiedrasCard).toBeDisplayed();
    await expect(MemberPage.valorantCard).toBeDisplayed();
    await expect(MemberPage.furboCardBtn).toBeDisplayed();
    await expect(MemberPage.baseballCardBtn).toBeDisplayed();
    await expect(MemberPage.piscinaCardBtn).toBeDisplayed();
    await expect(MemberPage.baseballCardBtn).toBeDisplayed();
    await expect(MemberPage.javascriptCardBtn).toBeDisplayed();
    await expect(MemberPage.handballCardBtn).toBeDisplayed();
    await expect(MemberPage.picapiedrasCardBtn).toBeDisplayed();
    await expect(MemberPage.valorantCardBtn).toBeDisplayed();
    await expect(MemberPage.furboCardBtn).toBeClickable();
    await expect(MemberPage.boxingCardBtn).toBeClickable();
    await expect(MemberPage.piscinaCardBtn).toBeClickable();
    await expect(MemberPage.baseballCardBtn).toBeClickable();
    await expect(MemberPage.javascriptCardBtn).toBeClickable();
    await expect(MemberPage.handballCardBtn).toBeClickable();
    await expect(MemberPage.picapiedrasCardBtn).toBeClickable();
    await expect(MemberPage.valorantCardBtn).toBeClickable();
    await MemberPage.furboCardBtnClick();
    await expect(MemberPage.activityModal).toBeDisplayed();
    await MemberPage.activityModalBtn[1].click();
    await MemberPage.boxingCardBtnClick();
    await expect(MemberPage.activityModal).toBeDisplayed();
    await MemberPage.activityModalBtn[1].click();
    await MemberPage.piscinaCardBtnClick();
    await expect(MemberPage.activityModal).toBeDisplayed();
    await MemberPage.activityModalBtn[1].click();
    await MemberPage.baseballCardBtnClick();
    await expect(MemberPage.activityModal).toBeDisplayed();
    await MemberPage.activityModalBtn[1].click();
    await MemberPage.javascriptCardBtnClick();
    await expect(MemberPage.activityModal).toBeDisplayed();
    await MemberPage.activityModalBtn[1].click();
    await MemberPage.handballCardBtnClick();
    await expect(MemberPage.activityModal).toBeDisplayed();
    await MemberPage.activityModalBtn[1].click();
  });

  it('See profile', async () => {
    await expect(MemberPage.navBtn[2]).toBeDisplayed();
    await expect(MemberPage.navBtn[2]).toBeClickable();
    await MemberPage.navBtn[2].click();
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl === 'https://nico-megarocket-app.vercel.app/member/profile';
      },
      { timeout: 3000, timeoutMsg: 'Thr URL do not change when I click.' }
    );
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/member/profile');
    await expect(MemberPage.photo).toBeDisplayed();
    await expect(MemberPage.infoProfile).toBeDisplayed();
    await expect(MemberPage.logoutBtn).toBeDisplayed();
    await expect(MemberPage.logoutBtn).toBeClickable();
    await MemberPage.logoutBtnClick();
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl === 'https://nico-megarocket-app.vercel.app/auth/login';
      },
      { timeout: 3000, timeoutMsg: 'Thr URL do not change when I click.' }
    );
    const currentLogoutUrl = await browser.getUrl();
    expect(currentLogoutUrl).toEqual('https://nico-megarocket-app.vercel.app/auth/login');
  });
});

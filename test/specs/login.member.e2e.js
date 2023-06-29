/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const HomePage = require('../pageobjects/home.page.js');
const Login = require('../pageobjects/login.page.js');
const memberPage = require('../pageobjects/member.page.js');
const MemberPage = require('../pageobjects/member.page.js');

describe('login member', () => {
  beforeAll(() => {
    browser.setWindowSize(1360, 768);
    browser.url('https://nico-megarocket-app.vercel.app/auth');
  });

  it('success process', async () => {
    await expect(HomePage.navBtn[1]).toBeDisplayed();
    await expect(HomePage.navBtn[1]).toBeClickable();
    await HomePage.navBtn[1].click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/auth/login');
  });

  it('label displayed', async () => {
    await expect(Login.emailLabel).toBeDisplayed();
    await expect(Login.passwordLabel).toBeDisplayed();
  });

  it('Login with all empty', async () => {
    await Login.loginForm('', '');
    await expect(Login.loginBtn).toBeDisplayed();
    await expect(Login.loginBtn).toBeClickable();
    await Login.loginBtnClick();
    const errorEmailText = await Login.errorEmailInput.getText();
    expect(errorEmailText).toEqual('The email is a required field');
    const errorPasswordText = await Login.errorPasswordInput.getText();
    expect(errorPasswordText).toEqual('The password field is required');
  });

  it('Login with incorrect user', async () => {
    await Login.loginForm('barbi@gmail.com', 'Hola12365');
    await expect(Login.loginBtn).toBeDisplayed();
    await Login.loginBtnClick();
    const loginDenied = await Login.errorLoginDenied.getText();
    expect(loginDenied).toEqual('The username or password is incorrect');
  });

  it('Login succes', async () => {
    await Login.loginForm('vigiyak708@edulena.com', '1234Gino');
    await expect(Login.loginBtn).toBeDisplayed();
    await Login.loginBtnClick();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/member');
  });

  it('See classes', async () => {
    await expect(MemberPage.navBtn[0]).toBeDisplayed();
    await expect(MemberPage.navBtn[0]).toBeClickable();
    await MemberPage.navBtn[0].click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/member/classes');
    await expect(MemberPage.classesContainer).toBeDisplayed();
  });

  it('See activities', async () => {
    await expect(MemberPage.navBtn[1]).toBeDisplayed();
    await expect(MemberPage.navBtn[1]).toBeClickable();
    await MemberPage.navBtn[1].click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/member/activities');
    await expect(MemberPage.fulboCard).toBeDisplayed();
    await expect(MemberPage.boxingCard).toBeDisplayed();
    await expect(MemberPage.piscinaCard).toBeDisplayed();
    await expect(MemberPage.baseballCard).toBeDisplayed();
    await expect(MemberPage.javascriptCard).toBeDisplayed();
    await expect(MemberPage.fulboCardBtn).toBeDisplayed();
    await expect(MemberPage.baseballCardBtn).toBeDisplayed();
    await expect(MemberPage.piscinaCardBtn).toBeDisplayed();
    await expect(MemberPage.baseballCardBtn).toBeDisplayed();
    await expect(MemberPage.javascriptCardBtn).toBeDisplayed();
    await expect(memberPage.fulboCardBtn).toBeClickable();
    await expect(memberPage.boxingCardBtn).toBeClickable();
    await expect(memberPage.piscinaCardBtn).toBeClickable();
    await expect(memberPage.baseballCardBtn).toBeClickable();
    await expect(memberPage.javascriptCardBtn).toBeClickable();
    await MemberPage.fulboCardBtnClick();
    await expect(MemberPage.activityModal).toBeDisplayed();
  });
});

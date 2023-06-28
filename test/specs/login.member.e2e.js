/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const HomePage = require('../pageobjects/home.page.js');
const Login = require('../pageobjects/login.page.js');

describe('login member', () => {
  beforeAll(() => {
    browser.setWindowSize(1360, 768);
    browser.url('https://nico-megarocket-app.vercel.app/auth');
  });

  it('success process', async () => {
    await expect(HomePage.navBtn[1]).toBeDisplayed();
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
    // const currentUrl = await browser.getUrl();
    // expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/member');
  });
});

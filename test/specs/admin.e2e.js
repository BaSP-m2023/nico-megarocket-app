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

  it('should show an error with an invalid email', async () => {
    LoginPage.emailInput.setValue('user');
    await expect(LoginPage.emailError).toBeDisplayed();
    expect(LoginPage.emailError).toHaveTextContaining('The email must be a valid email address');
  });

  it('should show an error with an invalid password', async () => {
    LoginPage.pswInput.setValue('user');
    await expect(LoginPage.pswError).toBeDisplayed();
    expect(LoginPage.pswError).toHaveTextContaining(
      'The password must contain at least one lowercase letter, one uppercase letter, and one digit'
    );
  });

  it('should show an error with incorrect credentials', async () => {
    LoginPage.emailInput.setValue('user@gmail.com');
    LoginPage.pswInput.setValue('User1234');
    await LoginPage.enterBtn.click();
    await expect(LoginPage.loginError).toBeDisplayed();
    expect(LoginPage.loginErrorMsg).toHaveTextContaining('The username or password is incorrect');
  });
});

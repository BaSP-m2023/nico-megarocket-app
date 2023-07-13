/* eslint-disable no-undef */
const HomePage = require('../pageobjects/home.page.js');
const LoginPage = require('../pageobjects/login.page.js');

describe('My Incorrect Login application', () => {
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
    await LoginPage.emailErrorMsg('The email is a required field');
    await LoginPage.pswErrorMsg('The password is a required field');
  });

  it('should show an error with an invalid email', async () => {
    await LoginPage.emailInput.setValue('user');
    await LoginPage.emailErrorMsg('The email must be a valid email address');
  });

  it('should show an error with an invalid password', async () => {
    await LoginPage.pswInput.setValue('user');
    await LoginPage.pswErrorMsg(
      'The password must contain at least one lowercase letter, one uppercase letter, and one digit'
    );
  });

  it('should show an error with incorrect credentials', async () => {
    await LoginPage.login('user@gmail.com', 'User1234');
    await expect(LoginPage.loginError).toBeDisplayed();
    expect(LoginPage.loginErrorMsg).toHaveTextContaining('The username or password is incorrect');
  });
});

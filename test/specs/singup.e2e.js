/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const HomePage = require('../pageobjects/home.page');
const SingUp = require('../pageobjects/sing.up.js');

describe('go to login user', () => {
  beforeAll(() => {
    browser.setWindowSize(1360, 768);
    browser.url('https://nico-megarocket-app.vercel.app/auth');
  });

  it('success process', async () => {
    await expect(HomePage.navBtn[2]).toBeDisplayed();
    await HomePage.navBtn[2].click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/auth/sign-up');
  });

  it('Sing up with error', async () => {
    await SingUp.singUpForm('', '', '', '', '', '', '', '', '', '');
    await expect(SingUp.singUpBtn).toBeDisplayed();
    await SingUp.singUpBtnClick();

    const errorNameText = await SingUp.errorNameInput.getText();
    expect(errorNameText).toEqual('The first name is a required field');

    const errorLnText = await SingUp.errorLnInput.getText();
    expect(errorLnText).toEqual('The last name is a required field');
    const errorDniText = await SingUp.errorDniInput.getText();
    expect(errorDniText).toEqual('The DNI must be a number');
    const errorBirthdayText = await SingUp.errorBirthdayInput.getText();
    expect(errorBirthdayText).toEqual('The birthday must be a valid date');
    const errorPhoneText = await SingUp.errorPhoneInput.getText();
    expect(errorPhoneText).toEqual('The phone number is a required field');
    const errorCityText = await SingUp.errorCityInput.getText();
    expect(errorCityText).toEqual('The city is a required field');
    const errorPostalcodeText = await SingUp.errorPostalcodeInput.getText();
    expect(errorPostalcodeText).toEqual('The postal code is a required field');
    const errorMembershipText = await SingUp.errorMembershipSelect.getText();
    expect(errorMembershipText).toEqual('"membership" is not allowed to be empty');
    const errorEmailText = await SingUp.errorEmailInput.getText();
    expect(errorEmailText).toEqual('The email is a required field');
    const errorPasswordText = await SingUp.errorPasswordInput.getText();
    expect(errorPasswordText).toEqual('The password field is required');
  });
});

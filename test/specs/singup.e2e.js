/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const HomePage = require('../pageobjects/home.page.js');
const singUp = require('../pageobjects/sing.up.js');
const SingUp = require('../pageobjects/sing.up.js');

describe('sing up member', () => {
  beforeAll(() => {
    browser.setWindowSize(1360, 768);
    browser.url('https://nico-megarocket-app.vercel.app/auth');
  });

  it('cancel the process', async () => {
    await expect(HomePage.navBtn[2]).toBeDisplayed();
    await HomePage.navBtn[2].click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/auth/sign-up');
    await SingUp.singUpBtnCancelClick();
  });

  it('success process', async () => {
    await expect(HomePage.navBtn[2]).toBeDisplayed();
    await HomePage.navBtn[2].click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/auth/sign-up');
  });

  it('label displyed', async () => {
    await expect(SingUp.nameLabel).toBeDisplayed();
    await expect(SingUp.lastNameLabel).toBeDisplayed();
    await expect(SingUp.dniLabel).toBeDisplayed();
    await expect(SingUp.birthdayLabel).toBeDisplayed();
    await expect(SingUp.phoneLabel).toBeDisplayed();
    await expect(SingUp.cityLabel).toBeDisplayed();
    await expect(SingUp.postalcodeLabel).toBeDisplayed();
    await expect(SingUp.membershipLabel).toBeDisplayed();
    await expect(SingUp.emailLabel).toBeDisplayed();
    await expect(SingUp.passwordLabel).toBeDisplayed();
  });

  it('Sing up with all empty', async () => {
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

  it('Sing up with other errors', async () => {
    await SingUp.nameInput.setValue('Ba');
    await SingUp.lastNameInput.setValue('M');
    await SingUp.dniInput.setValue('377');
    await SingUp.birthdayInput.click();
    await browser.keys('2');
    await browser.keys('0');
    await SingUp.phoneInput.setValue('341');
    await SingUp.cityInput.setValue('Ro');
    await SingUp.postalcodeInput.setValue('20');
    await SingUp.emailInput.setValue('barbi');
    await SingUp.passwordInput.setValue('hola');

    await expect(SingUp.singUpBtn).toBeDisplayed();
    await SingUp.singUpBtnClick();

    const errorNameText = await SingUp.errorNameInput.getText();
    expect(errorNameText).toEqual('The first name must be at least 3 characters');
    const errorLnText = await SingUp.errorLnInput.getText();
    expect(errorLnText).toEqual('The last name must be at least 3 characters');
    const errorDniText = await SingUp.errorDniInput.getText();
    expect(errorDniText).toEqual('The DNI must be at least 10,000,000');
    const errorBirthdayText = await SingUp.errorBirthdayInput.getText();
    expect(errorBirthdayText).toEqual('The birthday must be a valid date');
    const errorPhoneText = await SingUp.errorPhoneInput.getText();
    expect(errorPhoneText).toEqual('The phone number must be at least 10 digits');
    const errorCityText = await SingUp.errorCityInput.getText();
    expect(errorCityText).toEqual('The city must be at least 3 characters');
    const errorPostalcodeText = await SingUp.errorPostalcodeInput.getText();
    expect(errorPostalcodeText).toEqual('The postal code must be at least 4 digits');
    const errorMembershipText = await SingUp.errorMembershipSelect.getText();
    expect(errorMembershipText).toEqual('"membership" is not allowed to be empty');
    const errorEmailText = await SingUp.errorEmailInput.getText();
    expect(errorEmailText).toEqual('The email must be a valid email address');
    const errorPasswordText = await SingUp.errorPasswordInput.getText();
    expect(errorPasswordText).toEqual('The password must be at least 8 characters long');
  });

  it('Sing up succes', async () => {
    await SingUp.nameInput.setValue('Barbara');
    await SingUp.lastNameInput.setValue('Millan');
    await SingUp.dniInput.setValue('37714520');
    await SingUp.birthdayInput.click();
    await browser.keys('2');
    await browser.keys('0');
    await browser.keys('0');
    await browser.keys('8');
    await browser.keys('1');
    await browser.keys('9');
    await browser.keys('9');
    await browser.keys('4');
    await SingUp.phoneInput.setValue('3415698745');
    await SingUp.cityInput.setValue('Rosario');
    await SingUp.postalcodeInput.setValue('2000');
    await SingUp.emailInput.setValue('barbi@gmail.com');
    await SingUp.membershipSelect.click();
    await SingUp.membershipSelectoption[2].click();
    await SingUp.passwordInput.setValue('Hola12345');

    await expect(SingUp.singUpBtn).toBeDisplayed();
    await SingUp.singUpBtnClick();
  });
});

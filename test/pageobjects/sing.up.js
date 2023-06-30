/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

class SingUp {
  get nameLabel() {
    return $('[data-testid="signup-name-input"] label');
  }

  get lastNameLabel() {
    return $('[data-testid="signup-lastname-input"] label');
  }

  get dniLabel() {
    return $('[data-testid="signup-dni-input"] label');
  }

  get birthdayLabel() {
    return $('[data-testid="signup-birthday-input"] label');
  }

  get phoneLabel() {
    return $('[data-testid="signup-phone-input"] label');
  }

  get cityLabel() {
    return $('[data-testid="signup-city-input"] label');
  }

  get postalcodeLabel() {
    return $('[data-testid="signup-postalcode-input"] label');
  }

  get membershipLabel() {
    return $('[data-testid="signup-membership-input"] label');
  }

  get emailLabel() {
    return $('[data-testid="signup-email-input"] label');
  }

  get passwordLabel() {
    return $('[data-testid="signup-password-input"] label');
  }

  get nameInput() {
    return $('[data-testid="signup-name-input"] input');
  }

  get lastNameInput() {
    return $('[data-testid="signup-lastname-input"] input');
  }

  get dniInput() {
    return $('[data-testid="signup-dni-input"] input');
  }

  get birthdayInput() {
    return $('[data-testid="signup-birthday-input"] input');
  }

  get phoneInput() {
    return $('[data-testid="signup-phone-input"] input');
  }

  get cityInput() {
    return $('[data-testid="signup-city-input"] input');
  }

  get postalcodeInput() {
    return $('[data-testid="signup-postalcode-input"] input');
  }

  get membershipSelect() {
    return $('[data-testid="signup-membership-input"] select');
  }

  get membershipSelectoption() {
    return $('[data-testid="signup-membership-input"]').$$('option');
  }

  get emailInput() {
    return $('[data-testid="signup-email-input"] input');
  }

  get passwordInput() {
    return $('[data-testid="signup-password-input"] input');
  }

  get errorNameInput() {
    return $('[data-testid="signup-name-input"] p');
  }

  get errorLnInput() {
    return $('[data-testid="signup-lastname-input"] p');
  }

  get errorDniInput() {
    return $('[data-testid="signup-dni-input"] p');
  }

  get errorBirthdayInput() {
    return $('[data-testid="signup-birthday-input"] p');
  }

  get errorPhoneInput() {
    return $('[data-testid="signup-phone-input"] p');
  }

  get errorCityInput() {
    return $('[data-testid="signup-city-input"] p');
  }

  get errorPostalcodeInput() {
    return $('[data-testid="signup-postalcode-input"] p');
  }

  get errorMembershipSelect() {
    return $('[data-testid="signup-membership-input"] p');
  }

  get errorEmailInput() {
    return $('[data-testid="signup-email-input"] p');
  }

  get errorPasswordInput() {
    return $('[data-testid="signup-password-input"] p');
  }

  get singUpBtn() {
    return $('[data-testid="signup-btn"] button');
  }

  get singUpCancelBtn() {
    return $('[data-testid="signup-cancel-btn"] button');
  }

  async singUpForm(name, lastname, dni, birthday, phone, city, postalcode, email, password) {
    await this.nameInput.setValue(name);
    await this.lastNameInput.setValue(lastname);
    await this.dniInput.setValue(dni);
    await this.birthdayInput.setValue(birthday);
    await this.phoneInput.setValue(phone);
    await this.cityInput.setValue(city);
    await this.postalcodeInput.setValue(postalcode);
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
  }

  async singUpBtnClick() {
    await this.singUpBtn.click();
  }

  async singUpBtnCancelClick() {
    await this.singUpCancelBtn.click();
  }
}

module.exports = new SingUp();

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

class Login {
  get emailLabel() {
    return $('[data-testid="login-input-email"] label');
  }

  get passwordLabel() {
    return $('[data-testid="login-input-password"] label');
  }

  get emailInput() {
    return $('[data-testid="login-input-email"] input');
  }

  get passwordInput() {
    return $('[data-testid="login-input-password"] input');
  }

  get errorEmailInput() {
    return $('[data-testid="login-input-email"] p');
  }

  get errorPasswordInput() {
    return $('[data-testid="login-input-password"] p');
  }

  get errorLoginDenied() {
    return $('[data-testid="login-error-pop"] p');
  }

  get loginBtn() {
    return $('[data-testid="enter-login-btn"] button');
  }

  async loginForm(email, password) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
  }
  async loginBtnClick() {
    await this.loginBtn.click();
  }
}

module.exports = new Login();

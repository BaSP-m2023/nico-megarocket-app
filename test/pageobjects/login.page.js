/* eslint-disable no-undef */
class LoginPage {
  get emailInput() {
    return $('[data-testid="login-input-email"]>input');
  }

  get emailError() {
    return $('[data-testid="login-input-email"]>p');
  }

  get pswInput() {
    return $('[data-testid="login-input-password"]>input');
  }

  get pswError() {
    return $('[data-testid="login-input-password"]>p');
  }

  get enterBtn() {
    return $('[data-testid="enter-login-btn"]>button');
  }

  get loginError() {
    return $('[data-testid="login-error-pop"]');
  }

  get loginErrorMsg() {
    return $('[data-testid="login-error-pop"]>p');
  }

  get loader() {
    return $('[data-testid="classes-table-loader"]');
  }
}

module.exports = new LoginPage();

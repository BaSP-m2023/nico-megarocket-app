/* eslint-disable no-undef */
class Login {
  get loginBtn() {
    return $('nav').$$('[data-testid="home-btn"]');
  }

  get emailLogin() {
    return $('[data-testid="login-input-email"]');
  }

  get passwordLogin() {
    return $('[data-testid="login-input-password"]');
  }

  get enterLoginBtn() {
    return $('[data-testid="enter-login-btn]');
  }

  get logOutBtn() {
    return $('[data-testid="log-out-btn"]');
  }

  async loginSuperAdmin(email, password) {
    await this.emailLogin.setValue(email);
    await this.passwordLogin.setValue(password);
  }

  async loginBtnClick() {
    await this.loginBtn[1].click();
  }

  async enterLoginBtnClick() {
    await this.enterLoginBtn.click();
  }

  async logOutBtnClick() {
    await this.logOutBtn.click();
  }
}

module.exports = new Login();

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

class TrainerPage {
  get navBtn() {
    return $('nav').$$('[data-testid="home-btn"]');
  }

  get logoutBtn() {
    return $('nav').$$('[data-testid="log-out-btn"]');
  }

  get textTittle() {
    return $('h1=Welcome,');
  }

  get infoProfile() {
    return $('[data-testid="info-container"]');
  }

  async logoutBtnClick() {
    return this.logoutBtn.click();
  }
}

module.exports = new TrainerPage();

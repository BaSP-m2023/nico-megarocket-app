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
    return $('h1*=Welcome,');
  }

  get infoProfile() {
    return $('[data-testid="info-container"]');
  }

  get editProfileBtn() {
    return $('[data-testid="info-container"] p');
  }

  get saveBtn() {
    return $('button=Save');
  }

  get resetBtn() {
    return $('button=Reset');
  }

  get cancelBtn() {
    return $('button=Cancel');
  }

  async logoutBtnClick() {
    return this.logoutBtn.click();
  }

  async editProfileBtnClick() {
    return this.editProfileBtn.click();
  }

  async cancelBtnClick() {
    return this.editProfileBtn.click();
  }
}

module.exports = new TrainerPage();

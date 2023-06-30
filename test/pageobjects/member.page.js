/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

class MemberPage {
  get navBtn() {
    return $('nav').$$('[data-testid="home-btn"]');
  }

  get logoutBtn() {
    return $('[data-testid="log-out-btn"]');
  }

  get classesContainer() {
    return $('[data-testid="classes-container"]');
  }

  get fulboCard() {
    return $('[data-testid="fulbo-card"]');
  }

  get fulboCardBtn() {
    return $('[data-testid="fulbo-card"] button');
  }

  get boxingCard() {
    return $('[data-testid="Boxing-card"]');
  }

  get boxingCardBtn() {
    return $('[data-testid="Boxing-card"] button');
  }

  get piscinaCard() {
    return $('[data-testid="Piscina-card"]');
  }

  get piscinaCardBtn() {
    return $('[data-testid="Piscina-card"] button');
  }

  get baseballCard() {
    return $('[data-testid="Baseball-card"]');
  }

  get baseballCardBtn() {
    return $('[data-testid="Baseball-card"] button');
  }

  get javascriptCard() {
    return $('[data-testid="Javascript-card"]');
  }

  get javascriptCardBtn() {
    return $('[data-testid="Javascript-card"] button');
  }

  get activityModal() {
    return $('[data-testid="activity-modal"]');
  }

  get activityModalBtn() {
    return $('[data-testid="activity-modal"] button');
  }

  get photo() {
    return $('[data-testid="photo-container"]');
  }

  get infoProfile() {
    return $('[data-testid="info-container"]');
  }

  async fulboCardBtnClick() {
    return this.fulboCardBtn.click();
  }

  async boxingCardBtnClick() {
    return this.boxingCardBtn.click();
  }

  async piscinaCardBtnClick() {
    return this.piscinaCardBtn.click();
  }

  async baseballCardBtnClick() {
    return this.baseballCardBtn.click();
  }

  async javascriptCardBtnClick() {
    return this.javascriptCardBtn.click();
  }

  async logoutBtnClick() {
    return this.logoutBtn.click();
  }
}

module.exports = new MemberPage();

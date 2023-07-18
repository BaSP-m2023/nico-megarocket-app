/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

class MemberPage {
  get navBtn() {
    return $('nav').$$('[data-testid="home-btn"]');
  }

  get textTittle() {
    return $('h3=Select the class you want to join:');
  }

  get selectClasses() {
    return $('select');
  }

  get logoutBtn() {
    return $('[data-testid="log-out-btn"]');
  }

  get classesContainer() {
    return $('[data-testid="classes-container"]');
  }

  get furboCard() {
    return $('[data-testid="Furbitoo-card"]');
  }

  get furboCardBtn() {
    return $('[data-testid="Furbitoo-card"] button');
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

  get handballCard() {
    return $('[data-testid="Handball-card"]');
  }

  get handballCardBtn() {
    return $('[data-testid="Handball-card"] button');
  }

  get picapiedrasCard() {
    return $('[data-testid="Picar piedras-card"]');
  }

  get picapiedrasCardBtn() {
    return $('[data-testid="Picar piedras-card"] button');
  }

  get valorantCard() {
    return $('[data-testid="Valorant-card"]');
  }

  get valorantCardBtn() {
    return $('[data-testid="Valorant-card"] button');
  }

  get activityModal() {
    return $('[data-testid="activity-modal"]');
  }

  get activityModalBtn() {
    return $('[data-testid="activity-modal"]').$$('button');
  }

  get joinButton() {
    return $('button=Join');
  }

  get photo() {
    return $('[data-testid="photo-container"]');
  }

  get infoProfile() {
    return $('[data-testid="info-container"]');
  }

  async furboCardBtnClick() {
    return this.furboCardBtn.click();
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

  async handballCardBtnClick() {
    return this.handballCardBtn.click();
  }

  async picapiedrasCardBtnClick() {
    return this.picapiedrasCardBtn.click();
  }

  async valorantCardBtnClick() {
    return this.valorantCardBtn.click();
  }

  async logoutBtnClick() {
    return this.logoutBtn.click();
  }
}

module.exports = new MemberPage();

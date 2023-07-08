/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

class TrainerPage {
  get navBtn() {
    return $('nav').$$('[data-testid="home-btn"]');
  }

  get logoutBtn() {
    return $('nav').$$('[data-testid="log-out-btn"]');
  }
}

module.exports = new TrainerPage();

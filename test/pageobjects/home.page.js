/* eslint-disable no-undef */
class HomePage {
  get navBtn() {
    return $('nav').$$('[data-testid="home-btn"]');
  }
}

module.exports = new HomePage();

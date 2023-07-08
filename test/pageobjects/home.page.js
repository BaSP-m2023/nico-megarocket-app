/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

class HomePage {
  get navBtn() {
    return $('nav').$$('[data-testid="home-btn"]');
  }
}

module.exports = new HomePage();

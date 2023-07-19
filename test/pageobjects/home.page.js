/* eslint-disable no-undef */
class HomePage {
  get navBtn() {
    return $('nav').$$('[data-testid="home-btn"]');
  }

  get mainTitle() {
    return $('h1=welcome to the mega rocket family');
  }

  get secondTitle() {
    return $('h2=About Mega Rocket');
  }

  get sectionFeatures() {
    return $('h2=Features');
  }

  get sectionActivities() {
    return $('h2=Gym activities');
  }

  get sectionMemberships() {
    return $('h2=Memberships');
  }

  get sectionContact() {
    return $('h2=Get in Touch');
  }
}

module.exports = new HomePage();

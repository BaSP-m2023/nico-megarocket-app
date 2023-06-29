/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class AdminClassesPage {
  get classesTable() {
    return $('[data-testid="classes-table"]');
  }

  get addBtnClass() {
    return $('[data-testid="add-class-btn"]>button');
  }

  get loader() {
    return $('[data-testid="admin-table-loader"]');
  }
}

module.exports = new AdminClassesPage();

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class AdminClassesPage {
  get classesTable() {
    return $('[data-testid="classes-table"]');
  }

  get addBtnClass() {
    return $('[data-testid="add-class-btn"] button');
  }

  get loader() {
    return $('[data-testid="admin-table-loader"]');
  }

  get hourClassInput() {
    return $('[data-testid="classes-hour-input"] select');
  }

  get activityClassInput() {
    return $('[data-testid="classes-activity-input"] select');
  }

  get dayClassInput() {
    return $('[data-testid="classes-day-input"] select');
  }

  get slotsClassInput() {
    return $('[data-testid="classes-slots-input"] input');
  }

  get trainerClassInput() {
    return $('[data-testid="classes-trainer-input"] select');
  }

  get classesSaveBtn() {
    return $('[data-testid="classes-save-btn"] button');
  }

  get confirmCreateModal() {
    return $('[data-testid="classes-modal-confirm"]');
  }

  get confirmModalBtn() {
    return this.confirmCreateModal.$$('button')[1];
  }

  get classPagination() {
    return $('[data-testid="classes-table"]').$$('button');
  }

  get classesRows() {
    return $('[data-testid="classes-table"]').$$('tr');
  }
}

module.exports = new AdminClassesPage();

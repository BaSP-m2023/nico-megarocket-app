/* eslint-disable no-undef */
class SuperAdmin {
  get addAdminBtn() {
    return $('[class="addButton_add_button__pawF1"]');
  }

  get inputAdminName() {
    return $('[data-testid="input-admin-name]');
  }

  get inputAdminEmail() {
    return $('[data-testid="input-admin-email"]');
  }

  get inputAdminLastName() {
    return $('[data-testid="input-admin-lastname"]');
  }

  get inputAdminCity() {
    return $('[data-testid="input-admin-city"]');
  }

  get inputAdminDni() {
    return $('[data-testid="input-admin-dni"]');
  }

  get inputAdminPassword() {
    return $('[data-testid="input-admin-password"]');
  }

  get inputAdminPhone() {
    return $('[data-testid="input-admin-phone"]');
  }

  get inputAdminRepeatPassword() {
    return $('[data-testid="input-admin-repeat-password"]');
  }

  get adminResetBtn() {
    return $('[data-testid="admin-reset-btn"]');
  }

  get adminSaveBtn() {
    return $('[data-testid="admin-save-btn"]');
  }

  get adminCancelBtn() {
    return $('[data-testid="admin-cancel-btn"]');
  }

  get adminEditBtn() {
    return $('[data-testid="edit-btn"]');
  }

  get adminDeleteBtn() {
    return $('[data-testid="delete-btn"]');
  }

  get adminConfirmDeleteBtn() {
    return $('[data-testid="delete-confirm-modal"] button:nth-child(2)');
  }

  get adminCancelDeleteBtn() {
    return $('[data-testid="delete-confirm-modal"] button:nth-child(1)');
  }

  get adminCloseDeleteModal() {
    return $('[data-testid="delete-confirm-modal"] img');
  }

  async loginAdmin(name, email, lastname, city, dni, password, phone, repeatPassword) {
    await this.inputAdminName.setValue(name);
    await this.inputAdminEmail.addValue(email);
    await this.inputAdminLastName.addValue(lastname);
    await this.inputAdminCity.addValue(city);
    await this.inputAdminDni.addValue(dni);
    await this.inputAdminPassword.addValue(password);
    await this.inputAdminPhone.addValue(phone);
    await this.inputAdminRepeatPassword.addValue(repeatPassword);
  }

  async addAdminBtnClick() {
    await this.addAdminBtn.click();
  }

  async adminResetBtnClick() {
    await this.adminResetBtn.click();
  }

  async adminSaveBtnClick() {
    await this.adminSaveBtn.click();
  }

  async adminCancelBtnClick() {
    await this.adminCancelBtn.click();
  }

  async adminEditBtnClick() {
    await this.adminEditBtn.click();
  }

  async adminDeleteBtnClick() {
    await this.adminDeleteBtn.click();
  }

  async adminConfirmDeleteBtnClick() {
    await this.adminConfirmDeleteBtn.click();
  }

  async adminCancelDeleteBtnClick() {
    await this.adminCancelDeleteBtn.click();
  }

  async adminCloseDeleteModalClick() {
    await this.adminCloseDeleteModal.click();
  }
}
module.exports = new SuperAdmin();

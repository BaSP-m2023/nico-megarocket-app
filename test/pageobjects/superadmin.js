/* eslint-disable no-undef */
class SuperAdmin {
  get addAdminBtn() {
    return $('[class="addButton_add_button__pawF1"] button');
  }

  get inputAdminName() {
    return $('[data-testid="input-admin-name] input');
  }

  get inputAdminEmail() {
    return $('[data-testid="input-admin-email"] input');
  }

  get inputAdminLastName() {
    return $('[data-testid="input-admin-lastname"] input');
  }

  get inputAdminCity() {
    return $('[data-testid="input-admin-city"] input');
  }

  get inputAdminDni() {
    return $('[data-testid="input-admin-dni"] input');
  }

  get inputAdminPassword() {
    return $('[data-testid="input-admin-password"] input');
  }

  get inputAdminPhone() {
    return $('[data-testid="input-admin-phone"] input');
  }

  get inputAdminRepeatPassword() {
    return $('[data-testid="input-admin-repeat-password"] input');
  }

  get adminResetBtn() {
    return $('[data-testid="admin-reset-btn"] button');
  }

  get adminSaveBtn() {
    return $('[data-testid="admin-save-btn"] button');
  }

  get adminCancelBtn() {
    return $('[data-testid="admin-cancel-btn"] button');
  }

  get adminEditBtn() {
    return $('[data-testid="edit-btn"] button');
  }

  get adminDeleteBtn() {
    return $('[data-testid="delete-btn"] button');
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

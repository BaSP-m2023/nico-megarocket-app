/* eslint-disable no-undef */
const Login = require('../pageobjects/login.page');
const SuperAdmin = require('../pageobjects/superadmin');

describe('crud of superadmin', () => {
  beforeAll(async () => {
    browser.url('https://nico-megarocket-app.vercel.app/auth');
  });

  it('go to login user', async () => {
    await expect(Login.loginBtn[1]).toBeDisplayed();
    await Login.loginBtn[1].click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/auth/login');
  });

  it('should login with valid credentials', async () => {
    await expect(Login.emailLogin).toBeDisplayed();
    await Login.loginSuperAdmin('superadmin@email.com', 'Password1');
    await Login.enterLoginBtnClick();
  });

  it('adding a new admin', async () => {
    await SuperAdmin.addAdminBtn.click();
    await SuperAdmin.inputAdminName.setValue('Miley');
    await SuperAdmin.inputAdminEmail.setValue('Miley@gmail.com');
    await SuperAdmin.inputAdminLastName.setValue('Cyrus');
    await SuperAdmin.inputAdminCity.setValue('Montevideo');
    await SuperAdmin.inputAdminDni.setValue('50163302');
    await SuperAdmin.inputAdminPassword.setValue('Miley1234');
    await SuperAdmin.inputAdminPhone.setValue('1111111111');
    await SuperAdmin.inputAdminRepeatPassword.setValue('Miley1234');
    await SuperAdmin.adminSaveBtn.click();

    await browser.pause(2000);
  });

  it('editing an admin', async () => {
    await SuperAdmin.adminEditBtn.click();
    await SuperAdmin.inputAdminName.setValue('Miley');
    await SuperAdmin.inputAdminEmail.setValue('Miley@gmail.com');
    await SuperAdmin.inputAdminLastName.setValue('Cyrus');
    await SuperAdmin.inputAdminCity.setValue('Rosario');
    await SuperAdmin.inputAdminDni.setValue('50163302');
    await SuperAdmin.inputAdminPassword.setValue('Miley1234');
    await SuperAdmin.inputAdminPhone.setValue('2222222222');
    await SuperAdmin.inputAdminRepeatPassword.setValue('Miley1234');
    await SuperAdmin.adminSaveBtn.click();

    await browser.pause(2000);
  });

  it('deletin an admin', async () => {
    await SuperAdmin.adminDeleteBtn.click();
    await SuperAdmin.adminConfirmDeleteBtn.click();

    await browser.pause(2000);
  });

  it('logut and go to home', async () => {
    await expect(Login.logOutBtn).toBeDisplayed();
    await Login.logOutBtn.click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/auth/login');
  });
});

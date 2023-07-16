/* eslint-disable no-undef */
const HomePage = require('../pageobjects/home.page.js');
const LoginPage = require('../pageobjects/login.page.js');
const AdminClassesPage = require('../pageobjects/admin.page.js');

describe('My Correct Login application', () => {
  beforeAll('Visit Main Page', () => {
    browser.url('https://nico-megarocket-app.vercel.app/auth');
  });

  it('should login as an admin', async () => {
    await expect(HomePage.navBtn[1]).toBeDisplayed();
    await HomePage.navBtn[1].click();
    await LoginPage.login('carlaperee@gmail.com', 'Password1');
    await AdminClassesPage.addBtnClass.waitForDisplayed();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/admin/classes');
  });

  it('should go to a form to create a new class', async () => {
    await AdminClassesPage.addBtnClass.click();
    await AdminClassesPage.hourClassInput.waitForDisplayed();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/admin/classes/ClassForm');
  });

  it('should show a confirm modal when create a new class', async () => {
    await AdminClassesPage.hourClassInput.selectByIndex(1);
    await AdminClassesPage.activityClassInput.selectByIndex(1);
    await AdminClassesPage.dayClassInput.selectByIndex(1);
    await AdminClassesPage.trainerClassInput.selectByIndex(1);
    await AdminClassesPage.slotsClassInput.setValue(10);
    await AdminClassesPage.classesSaveBtn.click();
    await expect(AdminClassesPage.confirmCreateModal).toBeDisplayed();
  });

  it('should show the list of classes after create a new class when confirm the modal', async () => {
    await AdminClassesPage.confirmModalBtn.click();
    await AdminClassesPage.addBtnClass.waitForDisplayed();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/admin/classes');
  });

  it('should show the new class in the list', async () => {
    const paginationButtons = await AdminClassesPage.classPagination;
    const paginationLen = paginationButtons.length;
    const targetButtonIndex = paginationLen - 2;
    await AdminClassesPage.classPagination[targetButtonIndex].click();
    const classesRows = await AdminClassesPage.classesRows;
    const classesLen = classesRows.length;
    const targetClassIndex = classesLen - 1;
    const newClass = classesRows[targetClassIndex];
    const newClassCells = newClass.$$('td');
    await expect(newClassCells[0]).toHaveTextContaining('furbo');
    await expect(newClassCells[1]).toHaveTextContaining('Monday');
    await expect(newClassCells[2]).toHaveTextContaining('08:00');
    await expect(newClassCells[3]).toHaveTextContaining('Bar Blodie');
    await expect(newClassCells[4]).toHaveTextContaining('10');
  });

  it('should show me a form after click to modify a class', async () => {
    const classesRows = await AdminClassesPage.classesRows;
    const classesLen = classesRows.length;
    const targetClassIndex = classesLen - 1;
    const newClass = classesRows[targetClassIndex];
    const newClassCells = newClass.$$('td');
    await newClassCells[5].click();
    await AdminClassesPage.hourClassInput.selectByIndex(2);
    await AdminClassesPage.classesSaveBtn.click();
    await expect(AdminClassesPage.confirmCreateModal).toBeDisplayed();
  });

  it('should show the list of classes after update a class when confirm the modal', async () => {
    await AdminClassesPage.confirmModalBtn.click();
    await AdminClassesPage.addBtnClass.waitForDisplayed();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toEqual('https://nico-megarocket-app.vercel.app/admin/classes');
  });

  it('should show the modify class in the list', async () => {
    const paginationButtons = await AdminClassesPage.classPagination;
    const paginationLen = paginationButtons.length;
    const targetButtonIndex = paginationLen - 2;
    await AdminClassesPage.classPagination[targetButtonIndex].click();
    const classesRows = await AdminClassesPage.classesRows;
    const classesLen = classesRows.length;
    const targetClassIndex = classesLen - 1;
    const newClass = classesRows[targetClassIndex];
    const newClassCells = newClass.$$('td');
    await expect(newClassCells[2]).toHaveTextContaining('09:00');
  });
});

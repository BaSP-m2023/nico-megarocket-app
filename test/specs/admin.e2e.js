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
    await AdminClassesPage.hourClassInput.selectByIndex(2);
    await AdminClassesPage.activityClassInput.selectByIndex(2);
    await AdminClassesPage.dayClassInput.selectByIndex(2);
    await AdminClassesPage.trainerClassInput.selectByIndex(2);
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
    await expect(newClassCells[0]).toHaveTextContaining('Boxing');
    await expect(newClassCells[1]).toHaveTextContaining('Tuesday');
    await expect(newClassCells[2]).toHaveTextContaining('09:00');
    await expect(newClassCells[3]).toHaveTextContaining('Earlin Haaland');
    await expect(newClassCells[4]).toHaveTextContaining('10');
  });

  it('should show me a form after click to modify a class', async () => {
    const classesRows = await AdminClassesPage.classesRows;
    const classesLen = classesRows.length;
    const targetClassIndex = classesLen - 1;
    const newClass = classesRows[targetClassIndex];
    const newClassCells = newClass.$$('td');
    await newClassCells[5].click();
    await AdminClassesPage.hourClassInput.selectByIndex(1);
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
    await expect(newClassCells[2]).toHaveTextContaining('08:00');
  });

  it('should appears a confirm modal after click to delete a class', async () => {
    const classesRows = await AdminClassesPage.classesRows;
    const classesLen = classesRows.length;
    const targetClassIndex = classesLen - 1;
    const newClass = classesRows[targetClassIndex];
    const newClassCells = newClass.$$('td');
    await newClassCells[6].$('img').click();
    await expect(AdminClassesPage.deleteConfirmModal).toBeDisplayed();
  });

  it('should delete a class after confirm the delete modal', async () => {
    await AdminClassesPage.deleteModalBtn.click();
    await AdminClassesPage.loader.waitForDisplayed();
    await AdminClassesPage.loader.waitForDisplayed({ reverse: true });
    const paginationButtons = await AdminClassesPage.classPagination;
    const paginationLen = paginationButtons.length;
    const targetButtonIndex = paginationLen - 1;
    await AdminClassesPage.classPagination[targetButtonIndex].click();
    const classesRows = await AdminClassesPage.classesRows;
    const classesLen = classesRows.length;
    const targetClassIndex = classesLen - 1;
    const lastClass = classesRows[targetClassIndex];
    const lastClassCells = await lastClass.$$('td').map((cell) => cell.textContent);
    expect(
      lastClassCells.includes('Boxing') &&
        lastClassCells.includes('Tuesday') &&
        lastClassCells.includes('08:00') &&
        lastClassCells.includes('Earlin Haaland') &&
        lastClassCells.includes('10')
    ).toBe(false);
  });
});

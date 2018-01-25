import { AppPage } from './app.po';
import { browser, protractor } from 'protractor';

describe('confusion App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display header text', () => {
    page.navigateTo('/');
    expect(page.getElement('app-header h1').getText()).toEqual('Ristorante Con Fusion');
  });

  xit('should have h4 footer text', () => {
    page.navigateTo('/');
    expect(page.getAllElements('app-footer h4').getText()).toContain('Links');
  });

  it('should navigate to about us page by clicking on the link', () => {
    page.navigateTo('/');

    const navlink = page.getAllElements('a').get(1);
    navlink.click();

    expect(page.getElementText('h3')).toBe('About Us');
  });

  it('should navigate to dishdetail us page by clicking on the menu link', () => {
    page.navigateTo('/menu');
    const navlink = page.getElement('md-grid-tile');

    expect(page.getElementText('h3')).toBe('Menu');
  });

  it('should enter a new comment for the first dish', () => {
    page.navigateTo('/dishdetail/0');

    const EC = protractor.ExpectedConditions;
    const newAuthor = page.getElement('input[type=text]');
    browser.wait(EC.visibilityOf(newAuthor), 5000);
    newAuthor.sendKeys('Test Author');

    const newComment = page.getElement('textarea');
    browser.wait(EC.visibilityOf(newComment), 5000);
    newComment.sendKeys('Test Comment');

    const newSubmitButton = page.getElement('button[type=submit]');
    browser.wait(EC.visibilityOf(newSubmitButton), 5000);
    newSubmitButton.click();

    browser.pause(49152);
  });
});

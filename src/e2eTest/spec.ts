import { browser, element, by } from 'protractor';

describe('Protractor Demo App', function () {
  it('should show the page title', function () {
    browser.get('https://localhost:4200/');
    element(by.id('app-title')).getText() as Promise<string>;
    expect(this.getText()).toEqual('Simple CRM');
  });
});

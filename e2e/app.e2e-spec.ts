import { TestClockPage } from './app.po';

describe('test-number-only App', () => {
  let page: TestClockPage;

  beforeEach(() => {
    page = new TestClockPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

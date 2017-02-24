import { TestNumberOnlyPage } from './app.po';

describe('test-number-only App', () => {
  let page: TestNumberOnlyPage;

  beforeEach(() => {
    page = new TestNumberOnlyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { GamerUxPage } from './app.po';

describe('gamer-ux App', () => {
  let page: GamerUxPage;

  beforeEach(() => {
    page = new GamerUxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

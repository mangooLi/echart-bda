import { AnalysisDemoPage } from './app.po';

describe('analysis-demo App', () => {
  let page: AnalysisDemoPage;

  beforeEach(() => {
    page = new AnalysisDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

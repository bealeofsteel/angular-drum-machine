'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /drum when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/drum");
  });


  describe('drum view', function() {

    beforeEach(function() {
      browser.get('index.html#/drum');
    });


    it('should render drum view when user navigates to /drum', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/Drum Machine/);
    });

  });
});

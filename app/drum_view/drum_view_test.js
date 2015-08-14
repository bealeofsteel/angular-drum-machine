'use strict';

describe('myApp.drum-machine module', function() {

  beforeEach(module('myApp.drum-machine'));

  describe('drum controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var drumCtrl = $controller('DrumCtrl');
      expect(drumCtrl).toBeDefined();
    }));

  });
});
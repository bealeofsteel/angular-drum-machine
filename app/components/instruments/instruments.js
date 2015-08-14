'use strict';

angular.module('myApp.instruments', [])

.factory('Instrument', [function() {
    return function(display, filename) {
        this.display = display;
        this.filename = filename;
        
        this.play = function() {
            new Audio('assets/audio/' + filename + '.wav').play();
        };
    };
}]);
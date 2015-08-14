'use strict';

angular.module('myApp.instruments', [])

.factory('Instrument', ['BEATS_PER_INSTRUMENT', function(BEATS_PER_INSTRUMENT) {
    return function(display, filename) {
        this.display = display;
        this.filename = filename;
        this.beats = [];
        
        for(var i = 0; i < BEATS_PER_INSTRUMENT; i++) {
            this.beats.push(false);
        }
        
        this.play = function() {
            new Audio('assets/audio/' + filename + '.wav').play();
        };
    };
}])

.value('BEATS_PER_INSTRUMENT', 16);;
'use strict';

angular.module('myApp.instruments', [])

.factory('Instrument', ['BEATS_PER_INSTRUMENT', function(BEATS_PER_INSTRUMENT) {
    return function(key, display, filename) {
        this.key = key;
        this.display = display;
        this.filename = filename;
        this.beats = [];
        
        for(var i = 0; i < BEATS_PER_INSTRUMENT; i++) {
            this.beats.push(false);
        }
        
        this.play = function() {
            new Audio('assets/audio/' + filename + '.wav').play();
        };
        
        this.getBeatsForUrl = function() {
            // get index of last enabled beat
            var lastBeat = -1;
            for(var i = this.beats.length - 1; i >= 0; i--) {
                if(this.beats[i]) {
                    lastBeat = i;
                    break;
                }
            }
            
            var beatsForUrl = [];
            for(var i = 0; i <= lastBeat; i++) {
                beatsForUrl.push(this.beats[i] ? 1 : 0);
            }
            
            return beatsForUrl;
        };
    };
}])

.value('BEATS_PER_INSTRUMENT', 16);;
'use strict';

angular.module('myApp.drum-machine', [])

.directive('drumMachine', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/components/drum_machine/drum_machine.html',
        controller: 'DrumCtrl'
    };
})

.controller('DrumCtrl', ['$scope', 'Instrument', 'BEATS_PER_INSTRUMENT', '$interval', '$window', '$location', function($scope, Instrument, BEATS_PER_INSTRUMENT, $interval, $window, $location) {
    
    /* Initialize tempo and list of instruments */
    
    $scope.tempo = 120;
    
    var instruments = [];
    instruments.push(new Instrument('kick', 'Kick', 'kick-acoustic01'));
    instruments.push(new Instrument('snare', 'Snare', 'snare-acoustic01'));
    instruments.push(new Instrument('hiHat', 'Hi-hat', 'hihat-acoustic01'));
    instruments.push(new Instrument('openHat', 'Open hi-hat', 'openhat-acoustic01'));
    instruments.push(new Instrument('highTom', 'High tom', 'tom-acoustic02'));
    instruments.push(new Instrument('lowTom', 'Low tom', 'tom-acoustic01'));
    instruments.push(new Instrument('ride', 'Ride', 'ride-acoustic02'));
    instruments.push(new Instrument('crash', 'Crash', 'crash-acoustic'));
    instruments.push(new Instrument('clap', 'Clap', 'clap-808'));
    instruments.push(new Instrument('chime', 'Chime', 'cowbell-808'));
    instruments.push(new Instrument('shaker', 'Shaker', 'shaker-analog'));
    instruments.push(new Instrument('block', 'Wood block', 'perc-808'));
    
    $scope.getInstruments = function() {
        return instruments;
    };
    
    /* Logic for parsing settings from URL */
    
    var setupDefaultPattern = function() {
        instruments[0].beats[0] = true;
        instruments[0].beats[3] = true;
        instruments[0].beats[8] = true;
        
        instruments[1].beats[4] = true;
        instruments[1].beats[12] = true;
        
        instruments[2].beats[2] = true;
        instruments[2].beats[6] = true;
        instruments[2].beats[10] = true;
        
        instruments[3].beats[14] = true;
    };
    
    var b64_to_utf8 = function(str) {
        return $window.atob(decodeURIComponent(str));
    };
    
    var SETTINGS_URL_STR = 'settings';
    
    var settings = $location.search()[SETTINGS_URL_STR];
    if(settings) {
        settings = angular.fromJson(b64_to_utf8(settings));
        $scope.tempo = settings.tempo;
        
        angular.forEach(instruments, function(instrument) {
            var savedPattern = settings.pattern[instrument.key];
            if(savedPattern) {
                for(var i = 0; i < savedPattern.length; i++) {
                    if(savedPattern[i] === 1) {
                        instrument.beats[i] = true;
                    }
                }
            }
        });
        
    } else {
        setupDefaultPattern();
    }
    
    /* Logic for saving settings to URL */
    
    var utf8_to_b64 = function(str) {
        return encodeURIComponent($window.btoa(str));
    };
    
    $scope.generateShareUrl = function() {
        var shareObj = {
            tempo: $scope.tempo,
            pattern: {
            }
        };
        
        angular.forEach(instruments, function(instrument) {
            var beatsForUrl = instrument.getBeatsForUrl();
            if(beatsForUrl.length > 0) {
                shareObj.pattern[instrument.key] = beatsForUrl;
            }
        });
        
        var shareStr = utf8_to_b64(angular.toJson(shareObj));
        
        $location.search(SETTINGS_URL_STR, shareStr);
        
        $scope.shareUrl = $location.absUrl();
    };
    
    /* Logic for playing beats */
    
    var promise;
    $scope.playIndex = -1;
    
    $scope.playBeats = function() {
        if(!$scope.tempo || $scope.tempo < 0) {
            $scope.tempo = 120;
        }
        
        $scope.playIndex = 0;
        promise = $interval(function() {
            angular.forEach(instruments, function(instrument) {
                if(instrument.beats[$scope.playIndex]) {
                    instrument.play();
                }
            });
            $scope.playIndex++;
            if($scope.playIndex >= BEATS_PER_INSTRUMENT) {
              $scope.playIndex = 0;  
            }
        }, getDelayInMs());
    };
    
    var getDelayInMs = function() {
        return ((60000.0 / $scope.tempo) / 4);
    };
    
    $scope.stopBeats = function() {
       $interval.cancel(promise);
       $scope.playIndex = -1;
    };
    
    $scope.isPlaying = function() {
        return $scope.playIndex !== -1;
    };
}]);
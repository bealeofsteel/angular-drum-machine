'use strict';

angular.module('myApp.drum-machine', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/drum', {
    templateUrl: 'drum_view/drum_view.html',
    controller: 'DrumCtrl'
  });
}])

.controller('DrumCtrl', ['$scope', 'Instrument', 'BEATS_PER_INSTRUMENT', '$interval', function($scope, Instrument, BEATS_PER_INSTRUMENT, $interval) {
        
    var instruments = [];
    instruments.push(new Instrument('Kick', 'kick-acoustic01'));
    instruments.push(new Instrument('Snare', 'snare-acoustic01'));
    instruments.push(new Instrument('Hi-hat', 'hihat-acoustic01'));
    instruments.push(new Instrument('Open hi-hat', 'openhat-acoustic01'));
    instruments.push(new Instrument('High tom', 'tom-acoustic02'));
    instruments.push(new Instrument('Low tom', 'tom-acoustic01'));
    instruments.push(new Instrument('Ride', 'ride-acoustic02'));
    instruments.push(new Instrument('Crash', 'crash-acoustic'));
    instruments.push(new Instrument('Clap', 'clap-808'));
    instruments.push(new Instrument('Chime', 'cowbell-808'));
    instruments.push(new Instrument('Shaker', 'shaker-analog'));
    instruments.push(new Instrument('Wood block', 'perc-808'));
    
    $scope.getInstruments = function() {
        return instruments;
    };
    
    var setupDefaultPattern = function() {
        instruments[0].beats[0] = true;
        instruments[0].beats[8] = true;
        
        instruments[1].beats[4] = true;
        instruments[1].beats[12] = true;
        
        instruments[2].beats[2] = true;
        instruments[2].beats[6] = true;
        instruments[2].beats[10] = true;
        
        instruments[3].beats[14] = true;
    };
    
    setupDefaultPattern();
    
    $scope.tempo = 120;
    
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
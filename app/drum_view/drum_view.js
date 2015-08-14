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
    
    $scope.tempo = 120;
    
    var promise;
    $scope.playIndex = -1;
    
    $scope.playBeats = function() {
        var secondsPerBeat = (1 / ($scope.tempo / 60.0)) / 4;
        
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
        }, secondsPerBeat * 1000);
    };
    
    $scope.stopBeats = function() {
       $interval.cancel(promise);
       $scope.playIndex = -1;
    };
    
    $scope.isPlaying = function() {
        return $scope.playIndex != -1;
    };
}]);
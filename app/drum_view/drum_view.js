'use strict';

angular.module('myApp.drum-machine', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/drum', {
    templateUrl: 'drum_view/drum_view.html',
    controller: 'DrumCtrl'
  });
}])

.controller('DrumCtrl', ['$scope', 'Instrument', function($scope, Instrument) {
        
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
    
}]);
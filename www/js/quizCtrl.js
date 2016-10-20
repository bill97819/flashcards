angular.module('starter.controllers', [])

//controller for the quiz tab
.controller('QuizCtrl', function ($state, $scope, $http, $rootScope, $location, $interval) {
    
    $scope.emptydeck = true;
    var url = "http://flashcards--app.herokuapp.com/deck";
    
    //getD() makes GET request to server for deck data
    $scope.getD = function () {
        $http.get(url).then(function (response) {
            $scope.decks = response.data.deck;
            $scope.emptydeck = false;
        });
    }
    
    //start() initializes a quiz
    $scope.start = function (deckinfo) {
        $rootScope.currentquiz = deckinfo;
        $state.go('tab.start');
    };
    
    //get data list and continue to refresh for updates
    $scope.getD();
    $interval(function () {
        $scope.getD();
    }, 2000);
});
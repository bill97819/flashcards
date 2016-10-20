angular.module('starter.controllers', [])

//controller for the manage tab
.controller('ManageCtrl', function ($state, $scope, $http, $rootScope, $location, $interval) {
    //initial values for the view
    $scope.emptydeck = true;
    $scope.adding = false;
    var url = "http://flashcards--app.herokuapp.com/deck";
    
    //getD() makes a GET request to the API for the list of decks
    $scope.getD = function () {
        $http.get(url).then(function (response) {
            $scope.decks = response.data.deck;
            $scope.emptydeck = false;
        });
    };
    
    //editD(deckinfo) goes to deck edit page to edit questions belonging to a specific deck
    $scope.editD = function (deckinfo) {
        $rootScope.currentdeck = deckinfo;
        $state.go('tab.deckedit');
    };
    
    //submit(text) makes a 
    $scope.submit = function (text) {
        var parameter = JSON.stringify({
            user_id: 1,
            title: text
        });
        $http.post(url, parameter);
    };
    
    //get decklist and refresh for changes
    $scope.getD();
    $interval(function () {
        $scope.getD();
    }, 2000);
});
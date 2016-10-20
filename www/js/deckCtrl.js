angular.module('starter.controllers', [])

.controller('DeckEditCtrl', function ($scope, $http, $rootScope, $location, $timeout) {
    //initial values to be used by view
    $scope.emptyquestion = true;
    $scope.deckname = $rootScope.currentdeck.title;
    $scope.editname = false;
    $scope.text = $scope.deckname;
    $scope.add = false;
    $scope.as = [];
    $scope.qs = [];
    $scope.qaedit = [];
    //API urls
    var qurl = "http://flashcards--app.herokuapp.com/question";
    var durl = "http://flashcards--app.herokuapp.com/deck";
    
    //getQ() makes a GET request to API for all questions
    $scope.getQ = function () {
        $http.get(qurl).then(function (response) {
            $scope.questions = response.data.question;
            var length = $scope.questions.length;
            var newarray = [];
            var newarraylength = 0;
            //filter out only matching deck IDs
            for (var i = 0; i < length; i++) {
                if ($rootScope.currentdeck.id == $scope.questions[i].deck_id) {
                    newarray[newarraylength] = $scope.questions[i];
                    newarraylength++;
                }
            }
            $scope.questions = newarray;
            if (newarraylength > 0) {
                $scope.emptyquestion = false;
            } else {
                $scope.emptyquestion = true;
            }
        });
    };
    
    //submitQ(text) makes a PUT request to edit a question resource
    $scope.submitQ = function (text) {
        //params
        var parameter = JSON.stringify({
            user_id: 1,
            title: text
        });
        var newurl = durl + "/" + $rootScope.currentdeck.id;
        //PUT request
        $http.put(newurl, parameter);
        $rootScope.currentdeck.title = text;
        $scope.deckname = text;
        //set delay to allow time for server to respond
        $timeout(function () {
            $scope.getQ();
        }, 2000);
    };
    
    //removeD() makes a DELETE request to delete a deck
    $scope.removeD = function () {
        var newurl = durl + "/" + $rootScope.currentdeck.id;
        $http.delete(newurl);
        $location.path('/tab/manage');
    };
    
    //addQ(addquestion, addanswer) makes a POST request to create a new question resource
    $scope.addQ = function (addquestion, addanswer) {
        //params
        var parameter = JSON.stringify({
            user_id: 1,
            deck_id: $rootScope.currentdeck.id,
            qtext: addquestion,
            atext: addanswer
        });
        //make http request
        $http.post(qurl, parameter);
        //refresh the questions list
        $timeout(function () {
            $scope.getQ();
        }, 2000);
    };

    //editQA(id, index, qaedit) makes a PUT request to edit a question resource
    $scope.editQA = function (id, index, qaedit) {
        var newurl = qurl + "/" + id;
        //params
        var parameter = JSON.stringify({
            user_id: 1,
            deck_id: $rootScope.currentdeck.id,
            qtext: $scope.qs[index],
            atext: $scope.as[index]
        });
        $scope.qs[index] = "";
        $scope.as[index] = "";
        //PUT request
        $http.put(newurl, parameter);
        $scope.qaedit[index] = false;
        //set delay to allow time for server to respond        
        $timeout(function () {
            $scope.getQ();
        }, 2000);
    };

    //removeQ(questioninfo,index) makes a DELETE request to delete a particular question
    $scope.removeQ = function (questioninfo, index) {
        var newurl = qurl + "/" + questioninfo.id;
        //DELETE request
        $http.delete(newurl);
        $scope.qaedit[index] = false;
        //set delay to allow time for server to respond
        $timeout(function () {
            $scope.getQ();
        }, 2000);
    };
    
    //get list of questions
    $scope.getQ();
});

angular.module('starter.controllers', [])

//controller for the quiz
.controller('StartCtrl', function ($state, $scope, $http, $rootScope, $location, $interval) {
    //initialize starting variables
    $scope.deckname = $rootScope.currentquiz.title;
    $scope.count = 0;
    $scope.done = false;
    $scope.inProgress = true;
    $scope.correct = true;
    $scope.score = 0;
    var qurl = "http://flashcards--app.herokuapp.com/question";

    //get() makes a GET request to the API to obtain the questions belonging to the chosen deck
    $scope.get = function () {
        $http.get(qurl).then(function (response) {
            $scope.questions = response.data.question;
            var length = $scope.questions.length;
            var newarray = [];
            var newarraylength = 0;
            //filter out only matching deck IDs
            for (var i = 0; i < length; i++) {
                if ($rootScope.currentquiz.id == $scope.questions[i].deck_id) {
                    newarray[newarraylength] = $scope.questions[i];
                    newarraylength++;
                }
            }
            $scope.questions = newarray;
            //if questions exist
            if (newarraylength > 0) {
                //randomly shuffle the questions array
                $scope.questions = $scope.shuffle($scope.questions);
                //set initial conditions 
                $scope.emptyquestion = false;
                $scope.numquestions = $scope.questions.length;
                $scope.question = $scope.questions[$scope.count].qtext;
                $scope.answer = $scope.questions[$scope.count].atext;
            } else {
                $scope.emptyquestion = true;
            }
        });
    };

    //shuffle(array) shuffles the elements of an array in a random order
    $scope.shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    //check(text) determines if user's answer matches the correct answer or not
    $scope.check = function (text) {
        //correct
        if (text == $scope.answer) {
            $scope.score++;
            $scope.correct = true;
        } else {
            $scope.correct = false;
        }
        $scope.inProgress = false;
    };

    //continue() displays the correct answer, increments the score, and gets the next question
    $scope.continue = function () {
        //not end
        if ($scope.count + 1 < $scope.questions.length) {
            $scope.count++;
            $scope.question = $scope.questions[$scope.count].qtext;
            $scope.answer = $scope.questions[$scope.count].atext;
            $scope.inProgress = true;
        }
        //end
        else {
            $scope.done = true;
        }
    };

    //get questions
    $scope.get();
});
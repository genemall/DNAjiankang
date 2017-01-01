
angular.module('question', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("question", {
                    url: '/question',
                    templateUrl: 'view/question.html',
                    controller: function($scope){
                    },
                })
        }
    ])

angular.module('personal', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("personal", {
                    url: '/personal',
                    templateUrl: 'view/personal.html',
                    controller: function($scope){
                    }
                })
        }
    ])
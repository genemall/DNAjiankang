
angular.module('aboutUs', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("aboutUs", {
                    url: '/aboutUs',
                    templateUrl: 'view/aboutUs.html',
                    controller: function($scope){
                    },
                })
        }
    ])
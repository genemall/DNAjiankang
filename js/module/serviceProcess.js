
angular.module('serviceProcess', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("serviceProcess", {
                    url: '/serviceProcess',
                    templateUrl: 'view/serviceProcess.html',
                    controller: function($scope){
                    },
                })
        }
    ])
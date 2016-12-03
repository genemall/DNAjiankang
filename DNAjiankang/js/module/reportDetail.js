
angular.module('reportDetail', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("reportDetail", {
                    url: '/reportDetail',
                    templateUrl: 'view/reportDetail.html',
                    controller: function($scope){
                    },
                })
        }
    ])
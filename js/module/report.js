
angular.module('report', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("report", {
                    url: '/report',
                    templateUrl: 'view/report.html',
                    controller: function($scope){
                    },
                })
        }
    ])
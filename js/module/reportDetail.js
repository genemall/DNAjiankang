
angular.module('reportDetail', ['ui.router','pdf-viewer'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("reportDetail", {
                    url: '/reportDetail/:id',
                    templateUrl: 'view/reportDetail.html',
                    controller: function($scope){
                        $scope.report_url='./resource/report.pdf'
                    },
                })
        }
    ])
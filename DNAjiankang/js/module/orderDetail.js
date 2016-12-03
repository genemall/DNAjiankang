
angular.module('orderDetail', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("orderDetail", {
                    url: '/orderDetail',
                    templateUrl: 'view/orderDetail.html',
                    controller: function($scope){
                    },
                })
        }
    ])
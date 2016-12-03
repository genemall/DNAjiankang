
angular.module('productDetail', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("productDetail", {
                    url: '/productDetail',
                    templateUrl: 'view/productDetail.html',
                    controller: function($scope){
                    },
                })
        }
    ])
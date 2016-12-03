
angular.module('product', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("product", {
                    url: '/product',
                    templateUrl: 'view/product.html',
                    controller: function($scope){
                    },
                })
        }
    ])
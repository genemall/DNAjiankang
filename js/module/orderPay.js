
angular.module('orderPay', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("orderPay", {
                    url: '/orderPay/:id',
                    templateUrl: 'view/orderPay.html',
                    resolve: {
                    	order_detail: function (httpService,$rootScope,$stateParams,util) {
                            return util.get($stateParams.id)
                       		},
               		 },
                    controller: function($scope,order_detail){
                    	console.log(order_detail)
                    },
                })
        }
    ])
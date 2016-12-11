/*
angular.module('personal', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("personal", {
                    url: '/personal/:id',
                    templateUrl: 'view/personal.html',
                    resolve: {
	                	order_list: function (httpService,$rootScope,$stateParams) {
	                        return httpService.get($rootScope.baseURL+'order/phoneGetOrdersByUserId.do?userId='+$stateParams.id)
	                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
	                                return data;
	                            });
	                    },
	                },
	                controller: function($scope,httpService,order_list,$rootScope){
                    	$scope.orders=order_list
                    	for item in order_list
                    		item[item.ordState] = item[ordState]+lenth(order_list)
                    		$scope.order_unpay = order_list.mapOrderProductList[ordState:1]
                    },
                    
                })
        }
    ])
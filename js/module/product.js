
angular.module('product', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("product", {
                    url: '/product/:id',
                    templateUrl: 'view/product.html',
	                resolve: {
	                	product_list: function (httpService,$rootScope,$stateParams) {
	                        return httpService.get($rootScope.baseURL+'product/phonefirstall.do?clsId='+$stateParams.id)
	                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
	                                return data;
	                            });
	                    },
	                },
                    controller: function($scope,httpService,product_list,$rootScope){
                    	$scope.products=product_list
                    	$scope.products_show=product_list[0].listProduct
                    	$scope.getProductsData=function(id){
                    		httpService.get($rootScope.baseURL+'product/phoneproall.do?clsId='+id)
	                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
	                                $scope.products_show=data;
	                       	});
                    	}
                    },
                })
        }
    ])
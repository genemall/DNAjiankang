
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
                    	$scope.products=product_list //导航页的三个标签，对应的展示	
                    	$scope.products_show=product_list[0].listProduct//每个标签对应的商品信息，默认是第一个标签
                    	$scope.getProductsData=function(id){ //点击其他标签，重新获取数据，并在最后的返回中给予赋值
                    		httpService.get($rootScope.baseURL+'product/phoneproall.do?clsId='+id)
	                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
	                                $scope.products_show=data;
	                       	});
                    	}
                    },
                })
        }
    ])
    
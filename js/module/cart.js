/**
 * 我的购物车页面路由模块
 */

angular.module('cart', ['ui.router','cartMd'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("cart", {
                    url: '/cart/:id',
                    templateUrl: 'view/cart.html',
                    resolve: {
	                	cart_list: function (httpService,$rootScope,$stateParams) {
	                        return httpService.get($rootScope.baseURL+'cart/phonecartsel.do?userId='+$stateParams.id)
	                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
	                             cart_datas=data.listOrderProduct;
	                             for (var i = 0; i < $scope.cart_datas.length; i++) {
                                        var item = $scope.cart_datas[i];
                                        $scope.cart_total += item.proCount * item.product.proRateprice;
                                 }
	                             return data;
	                        });
	                    },
	                },
                    controller:function($scope,cart_list,$rootScope){
                    	$scope.cart_datas=cart_list.listOrderProduct;
                    	$scope.$watch("cart_datas", function() {//监控数据变化
                            $scope.cart_total = 0;
                            for (var i = 0; i < $scope.cart_datas.length; i++) {
                                var item = $scope.cart_datas[i];
                                $scope.cart_total += item.proCount * item.product.proRateprice;
                            }
                        }, true);
                        $scope.update_cart_pro_count = function(proId,count) {
    		               for (var i = 0; i < $scope.cart_datas.length; i++) {
                                if ($scope.cart_datas[i].proId == proId) {
                                    $scope.cart_datas[i].proCount = $scope.cart_datas[i].proCount + count;//这里可以增加上下限制
                                }
                            }
    		            }

                    },
                    //配置导航，回到父层
                    ncyBreadcrumb:{
                        label:"我的购物车",
                        parent:"home.main"
                    }
                })
        }
    ])
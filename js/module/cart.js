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
	                                return data;
	                            });
	                    },
	                },
                    controller:function($scope,cart_list,$rootScope){
                    	console.log(cart_list)
                    	$scope.cart_datas=cart_list.listOrderProduct
                    },
                    //配置导航，回到父层
                    ncyBreadcrumb:{
                        label:"我的购物车",
                        parent:"home.main"
                    }
                })
        }
    ])
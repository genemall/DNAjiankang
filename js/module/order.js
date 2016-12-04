/**
 * 我的订单模块页面
 */

angular.module('order', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("order", {
                    url: '/order',
                    templateUrl: 'view/order.html',
                     resolve: {
                	classifyResolve: function (httpService) {
                        return httpService.get('json/order.json')
                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                return data.products;
                            });;
                   		},
               		 },
                 
                    
                    controller: function($scope,cartService,classifyResolve){
                        //调用服务获取我的购物车对象
                        $scope.cart = cartService.myCart;
                        $scope.orderlist=classifyResolve;
                    },
                    
                    //配置导航
                    ncyBreadcrumb:{
                        label:"我的订单",
                        parent:"home.main"
                    }
                })
        }
    ])
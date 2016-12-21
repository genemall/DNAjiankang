/**
 * 我的订单模块页面
 */

angular.module('order', ['ui.router','utilMd'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("order", {
                    url: '/order/:id/:ord_state',
                    templateUrl: 'view/order.html',
                    resolve: {
                    	order_show: function (httpService,$rootScope,$stateParams) {
                            return httpService.get($rootScope.baseURL+'/order/phoneGetOrdersByUserId.do?userId='+$stateParams.id+"&ordState="+$stateParams.ord_state)
                             .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                    return data;
                                });;
                       		},
               		 },
                    controller: function($scope,httpService,$rootScope,$stateParams,$location,order_show,util){
                        $scope.is_select_id=$stateParams.ord_state
                        $scope.order_show=util.get_sum_price(order_show)
                        $scope.getOrdersData = function(ord_state){
                            httpService.get($rootScope.baseURL+'/order/phoneGetOrdersByUserId.do?userId='+$stateParams.id+"&ordState="+ord_state)
                             .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                    $scope.order_show=util.get_sum_price(data);
                                    $scope.is_select_id=ord_state
                            });
                        }
                        $scope.orderDetail = function(ordId){
                            console.log(ordId)
                        	$location.path('/orderDetail/'+ordId)
                        }
                    },
                    //配置导航
                    ncyBreadcrumb:{
                        label:"我的订单",
                        parent:"home.main"
                    }
                })
        }
    ])
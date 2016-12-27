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
                    		if($stateParams.ord_state==3){//3,4,5,6均归为待检测
                    			$stateParams.ord_state="3,4,5,6"
                    		}
                            return httpService.get($rootScope.baseURL+'/order/phoneGetOrdersByUserId.do?userId='+$stateParams.id+"&ordState="+$stateParams.ord_state)
                             .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                    return data;
                                });;
                       		},
               		 },
                    controller: function($scope,httpService,$rootScope,$stateParams,$location,order_show,util){
                        $scope.is_select_id=$stateParams.ord_state
                        $scope.order_show=order_show
                        $scope.getOrdersData = function(ord_state){
                            httpService.get($rootScope.baseURL+'/order/phoneGetOrdersByUserId.do?userId='+$stateParams.id+"&ordState="+ord_state)
                             .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                    $scope.order_show=data;
                                    $scope.is_select_id=ord_state
                            });
                        }
                        $scope.orderDetail = function(ordId){
                        	$location.path('/orderDetail/'+ordId)
                        }
                        $scope.orderPay = function(ordId){
                         	for(var i=0;i<$scope.order_show.length;i++){
                        		if($scope.order_show[i].id==ordId){
                        			util.set('orderPay',$scope.order_show[i])
                        			break
                        		}
                        	}
                        	$location.path('/orderPay/')
                        }
                        $scope.isDetected = function(is_selected_id){
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
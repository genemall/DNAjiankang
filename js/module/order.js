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
                    		var temp = $stateParams.ord_state
                    		if($stateParams.ord_state==3){//3,4,5,6均归为待检测
                    			temp="3,4,5,6"
                    		}
                            return httpService.get($rootScope.baseURL+'/order/phoneGetOrdersByUserId.do?userId='+$stateParams.id+"&ordState="+temp)
                             .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                    return data;
                                });;
                       		},
               		 },
                    controller: function($scope,httpService,$rootScope,$stateParams,$location,order_show,util){
                        $scope.is_select_id=$stateParams.ord_state
                        $scope.order_show=order_show
                        $scope.getOrdersData = function(ord_state){
                        	var temp = ord_state
                    		if(ord_state==3){//3,4,5,6均归为待检测
                    			temp="3,4,5,6"
                    		}
                            httpService.get($rootScope.baseURL+'/order/phoneGetOrdersByUserId.do?userId='+$stateParams.id+"&ordState="+temp)
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
                        			//获取微信支付数据
                        			util.set('orderPay',$scope.order_show[i])
                        			var post_data={'openId':util.get("openId"),'finalmoney':$scope.order_show[i].ordPrice,
											'orderId':ordId}
                        			console.log(post_data)
			                    	httpService.post($rootScope.baseURL+'weixin/topay.do',post_data)
			                    	  .then(function (data) {
			                    	  	console.log(data)
		                                util.set('pay_data',data)
		                        		$location.path('/orderPay/')
			                        });
                        			break
                        		}
                        	}
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
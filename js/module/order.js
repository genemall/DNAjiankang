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
                    controller: function($scope,httpService,$rootScope,$stateParams,$location,order_show,$interval,util){
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
                        
                        $scope.orderCancel = function(ordId){
                        	$scope.isShowOrderDialog = 1
                        	$scope.dialog_content="确定取消此订单吗"
                        	$scope.ord_id=ordId
                         	
                        }
                        $scope.cancelBtnOK = function(ordId){
                        	 $scope.loadingToastHide = 1;
                        	for(var i=0;i<$scope.order_show.length;i++){
                        		if($scope.order_show[i].id==ordId){
                        			//获取微信支付数据
                        			var post_data={'orderId':ordId}
                        			console.log(post_data)
			                    	httpService.post($rootScope.baseURL+'weixin/cancelpay.do',post_data)
			                    	  .then(function (data) {
			                    	  	console.log(data)
		                                $scope.isShowOrderDialog = 0;
		                                $scope.loadingToastHide = 0;
		                                if(data){
			                    	  		$scope.order_show.splice(i,1);
		                                }else{
	                                	   	$scope.isShowToast = 1;
									        $interval(function() {
									            $scope.isShowToast = 0;
									        }, 2000, 1);
		                                }
			                        });
                        			break
                        		}
                        	}
                        }
                        $scope.btnCancel = function(){
                        	$scope.isShowOrderDialog = 0;
                        	$scope.isShowCarryDialog = 0;
                        	$scope.isShowDeliveryDialog=0
                        }
                        $scope.orderPay = function(ordId){
                        	   $scope.loadingToastHide = 1;
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
		                                $scope.loadingToastHide = 0;
		                        		$location.path('/orderPay/')
			                        });
                        			break
                        		}
                        	}
                        }
                        $scope.recieveDeliver = function(ord_id){
                        	$scope.isShowDeliveryDialog = 1;
                        	for(var i=0;i<$scope.order_show.length;i++){
                        		if($scope.order_show[i].id==ord_id){
                        			$scope.courierName=$scope.order_show[i].courierName
                        			$scope.courierNum=$scope.order_show[i].courierNum
                        			break
                        		}
                        	}
                        }
                    	$scope.sendDeliver=function(ord_id){
                    		$scope.isShowCarryDialog=1
                    		$scope.ord_id=ord_id
                    		for(var i=0;i<$scope.order_show.length;i++){
                        		if($scope.order_show[i].id==ord_id){
		                    		$scope.userCourierName=$scope.order_show[i].userCourierName
		                    		$scope.userCourierNum=$scope.order_show[i].userCourierNum
		                    		break
                        		}
                       		 }
                    	}
                    	$scope.deliverBtnOK=function(userCourierName,userCourierNum){
                    		if(userCourierName==null||userCourierNum==null||userCourierName==""||userCourierNum==""){
                			 	$scope.isShowWarnToast = 1;
						        $interval(function() {
						            $scope.isShowWarnToast = 0;
						        }, 1500, 1);
                    			return;
                    		}
                    		$scope.isShowCarryDialog=0
                    		var post_data={'userCourierNum':userCourierNum,
                    						'userCourierName':userCourierName,
											'orderId':$scope.ord_id}
                    		httpService.post($rootScope.baseURL+'order/phoneInsertCourierinfo.do',post_data)
	                    	  .then(function (data) {
	                    	  	console.log(data)
                                if(data){
                    	  			$scope.isShowToast = 1;
							        $interval(function() {
							            $scope.isShowToast = 0;
							        }, 1500, 1);
                                }
			                });
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
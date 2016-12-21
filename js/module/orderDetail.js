
angular.module('orderDetail', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("orderDetail", {
                    url: '/orderDetail/:id',
                    templateUrl: 'view/orderDetail.html',
                    resolve: {
                    	order_detail: function (httpService,$rootScope,$stateParams,util) {
                    	     return httpService.get($rootScope.baseURL+'order/phoneGetOrdersByOrderId.do?orderId='+$stateParams.id)
                             .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                    return data;
                                });
                        },
               		 },
                    controller: function($scope,order_detail){
                    	if(order_detail.ordState==1)
                    		$scope.ord_state='待付款'
                    	else if(order_detail.ordState==2)
                    		$scope.ord_state='待发货'
                    	else if(order_detail.ordState==3)
                    		$scope.ord_state='待收货'
                    	else
                    		$scope.ord_state='已完成'
                    	console.log(order_detail)
                    	$scope.ordNum=order_detail.ordNum;
                    	$scope.order_date=order_detail.createTime;
                    	$scope.orderDetail_datas=order_detail.mapOrderProductList;
                    	$scope.ordPrice=order_detail.ordPrice;

                    },
                })
        }
    ])
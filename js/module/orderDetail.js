
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
                    	state_dict={1:'待付款',2:'待发货',3:'买家待收货',4:'买家待发货',5:'卖家待收货',6:'待检测',7:'已完成'}
                    	$scope.ord_state=state_dict[order_detail.ordState]
                    	
                    	$scope.ordNum=order_detail.ordNum;
                    	$scope.order_date=order_detail.createTime;
                    	$scope.orderDetail_datas=order_detail.mapOrderProductList;
                    	$scope.ordPrice=order_detail.ordPrice;
                    	
                    	$scope.userName=order_detail.userName;
                    	$scope.userPhone=order_detail.userPhone;
                    	$scope.userAddress=order_detail.userAddress;

                    },
                })
        }
    ])
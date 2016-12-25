
angular.module('orderPay', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("orderPay", {
                    url: '/orderPay/:id',
                    templateUrl: 'view/orderPay.html',
                    resolve: {
                    	order_detail: function (httpService,$rootScope,$stateParams,util) {
                              return httpService.get($rootScope.baseURL+'order/phoneGetOrdersByOrderId.do?orderId='+$stateParams.id)
                             .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                    return data;
                                });
                       		},
               		 },
                    controller: function($scope,$rootScope,order_detail,httpService){
                    	$scope.ordNum=order_detail.ordNum;
                    	$scope.order_date=order_detail.createTime;
                    	$scope.orderDetail_datas=order_detail.mapOrderProductList;
                    	$scope.ordPrice=order_detail.ordPrice;
						var post_data={'openId':'ofzXwvnbUQYrVMmYn8uxZuHbbX5g','finalmoney':order_detail.ordPrice,'orderId':order_detail.id}
						var pay_data={}
                    	httpService.post($rootScope.baseURL+'weixin/topay.do',post_data)
                             .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                pay_data=data
                        });
                    	$scope.gotoPay=function(){
                			 WeixinJSBridge.invoke('getBrandWCPayRequest',pay_data,function(res){
									WeixinJSBridge.log(res.err_msg);
					// 				alert(res.err_code + res.err_desc + res.err_msg);
						            if(res.err_msg == "get_brand_wcpay_request:ok"){  
						            	console.log('ok')
						                alert("微信支付成功!");  
						            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){  
						                alert("用户取消支付!");  
						            }else{  
						            	alert(res.err_msg);
						    
						            }  
							})
                    	}
                    },
                })
        }
    ])
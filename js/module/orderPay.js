
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
						$scope.pay_data={}
                    	httpService.post($rootScope.baseURL+'weixin/topay.do',post_data)
                             .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                $scope.pay_data=data
                        });
                    	$scope.gotoPay=function(){
                    		console.log($scope.pay_data)
                			 WeixinJSBridge.invoke('getBrandWCPayRequest',{
									  		 "appId" : "wx2047d634692d65bf","timeStamp" : "1482659473", 
									  		 "nonceStr" : "1751124161", 
									  		 "package" : "prepay_id=wx201612251751136b86d659000442128921",
									  		 "signType" : "MD5", 
									  		 "paySign" : "C318F3DB4B4D4173FB5EE8993BDD6A47"
									   		},function(res){
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
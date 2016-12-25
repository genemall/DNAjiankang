
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
                        //获取 address 配置
                        httpService.post($rootScope.baseURL+'weixin/addresstest.do',{})
                             .then(function (msg) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                wx.config({
						            debug: false,
						            appId: msg.appid,
						            timestamp: msg.timestamp,
						            nonceStr: msg.noncestr,
						            signature: msg.signature,
						            jsApiList: [
						              // 所有要调用的 API 都要加到这个列表中
						                'checkJsApi',
						                'openAddress',
						                
						              ]
						          });
						        wx.checkJsApi({
						    	      jsApiList: [
						    	          'openAddress',
						    	      ],
						    	      success: function (res) {
						    	      	console.log(res)
						    	          alert(JSON.stringify(res));
						    	      }
						    	});   
                        });
                        //执行获取用户地址
                        $scope.getUserAddress=function(){
                        	wx.openAddress({
					            trigger: function (res) {
					              alert('用户开始拉出地址');
					            },
					            success: function (res) {
					              alert('用户成功拉出地址');
					              alert(JSON.stringify(res));
					            },
					            cancel: function (res) {
					              alert('用户取消拉出地址');
					            },
					            fail: function (res) {
					              alert(JSON.stringify(res));
					            }
					          });
                        }
                    	$scope.gotoPay=function(){
                            console.log($scope.pay_data)
                			 WeixinJSBridge.invoke('getBrandWCPayRequest',$scope.pay_data,function(res){
									WeixinJSBridge.log(res.err_msg);
					// 				alert(res.err_code + res.err_desc + res.err_msg);
						            if(res.err_msg == "get_brand_wcpay_request:ok"){  
						            	console.log('ok')
						                //alert("微信支付成功!");  
						            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){  
						                //alert("用户取消支付!");  
						            }else{  
						            	console.log(res.err_msg)
						    
						            }  
							})
                    	}
                    },
                })
        }
    ])
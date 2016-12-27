
angular.module('orderPay', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("orderPay", {
                    url: '/orderPay/:id',
                    templateUrl: 'view/orderPay.html',
                    resolve: {
                    	order_detail: function (httpService,$rootScope,$stateParams,util) {
                              return httpService.get($rootScope.baseURL+'order/phoneGetOrdersByOrderId.do?orderId='+2)
                             .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                    return data;
                                });
                       		},
               		 },
                    controller: function($scope,$rootScope,loginService,order_detail,util,httpService){
                    	$scope.ordNum=order_detail.ordNum;
                    	$scope.order_date=order_detail.createTime;
                    	$scope.orderDetail_datas=order_detail.mapOrderProductList;
                    	$scope.ordPrice=order_detail.ordPrice;
                    	//获取微信支付数据
						var post_data={'openId':util.get("openId"),'finalmoney':order_detail.ordPrice,'orderId':order_detail.id}
						$scope.pay_data={}
                    	httpService.post($rootScope.baseURL+'weixin/topay.do',post_data)
                             .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                $scope.pay_data=data
                        });
                        //根据cookie判断地址是否配置和加载
                        if(loginService.getCookie('address')==null){
                        	//获取 address 配置
                        	httpService.post($rootScope.baseURL+'weixin/address.do',{})
                             	.then(function (msg) {
                             	loginService.set("address",msg)
                            });  	
                        }
                        var msg = loginService.getCookie('address')
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
					    	          //alert(JSON.stringify(res));
					    	      }
						});   
                        //执行获取用户地址
                        $scope.getUserAddress=function(){
                        	wx.openAddress({
					            trigger: function (res) {
					              //alert('用户开始拉出地址');
					            },
					            success: function (res) {
					              //alert('用户成功拉出地址');
					              console.log(JSON.stringify(res));
					            },
					            cancel: function (res) {
					              //alert('用户取消拉出地址');
					            },
					            fail: function (res) {
					              //alert(JSON.stringify(res));
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
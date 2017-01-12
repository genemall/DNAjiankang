
angular.module('orderPay', ['ui.router','utilMd'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("orderPay", {
                    url: '/orderPay/:id',
                    templateUrl: 'view/orderPay.html',
                    resolve: {
                    	order_detail: function (httpService,util) {
                    		if(util.get('from_order')!=null){
				            	location.reload(true)
				            	util.set('from_order',null)
			            	}
                    		return util.get('orderPay')
                   		},
//						order_detail: function (httpService,$rootScope,$stateParams,util) {
//                  	     return httpService.get($rootScope.baseURL+'order/phoneGetOrdersByOrderId.do?orderId=2')
//                           .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
//                                  return data;
//                              });
//                      },
               		 },
                    controller: function($scope,$rootScope,$interval,$location,loginService,order_detail,util,httpService){
                    	
                    	$scope.orderDetail_datas=order_detail.mapOrderProductList;
                    	$scope.ordPrice=order_detail.ordPrice;
                    	//$scope.address={"userName":"请选择收获地址","telNumber":"","addressInfo":""}
                    	var user_address = loginService.getCookie('user_address')
                    	//或者存cookie设置100年
                    	if(user_address==null){
                    		$scope.address={"userName":"请选择收获地址","userPhone":"","userAddress":"","userPostal":"","userArea":""}
                    	}else{
                    		$scope.address={"userName":user_address.userName,
                    						"userPhone":user_address.userPhone,
                    						"userAddress":user_address.userAddress,
                    						"userPostal":user_address.userPostal,
                    						"userArea":user_address.userArea
                    		}
                    	}
                    	$scope.wx_config=function(){
				    		msg = loginService.getCookie('address')
				    		console.log(msg)
				        	wx.config(
				            {
					            debug: true,
					            appId: msg.appid,
					            timestamp: msg.timestamp,
					            nonceStr: msg.noncestr,
					            signature: msg.signature,
					            jsApiList: [
					              // 所有要调用的 API 都要加到这个列表中
					                'checkJsApi',
					                'openAddress',
//					                'hideAllNonBaseMenuItem',
					                'onMenuShareAppMessage',
//					                'onMenuShareTimeline',
//					                'onMenuShareQQ'
					              ]
					          	});
						        wx.checkJsApi({
					    	      jsApiList: [
					    	          'openAddress',
//					    	          'hideAllNonBaseMenuItem',
					    	          'onMenuShareAppMessage',
//					    	          'onMenuShareTimeline',
//				                	  'onMenuShareQQ'	
					    	      ],
					    	      success: function (res) {
					    	          //alert(JSON.stringify(res));
					    	      }
							}); 
							//wx.hideAllNonBaseMenuItem();
				    	}
                    	wx.ready(function(){
							//wx.hideAllNonBaseMenuItem();
							wx.onMenuShareAppMessage({
						   	    title: "ceshi", // 分享标题
							    desc: "ceshi de miao shu", // 分享描述
							    link: 'http://nbuxinxiren.cn/DNAjiankang/index.html#/orderPay/', // 分享链接
							    imgUrl: "http://myfirst1990.oss-cn-shanghai.aliyuncs.com/201701120147473977kids2.jpg", // 分享图标
							    type: '', // 分享类型,music、video或link，不填默认为link
							    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
							    success: function () { 
							        // 用户确认分享后执行的回调函数
							        alert("success")
							    },
							    cancel: function () { 
							        // 用户取消分享后执行的回调函数
							        alert("cancel")
							    }
							});
						});
				        //根据cookie判断地址是否配置和加载
				        if(loginService.getCookie('address')==null){
//				        	loginService.putCookieForever("address",0) 
				        	//获取 address 配置
				        	httpService.post($rootScope.baseURL+'weixin/address.do',{'url':$location.absUrl()})
				        	.then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
				        		loginService.putCookieForever("address",data) 
				        		$scope.wx_config()
				             });
				        }else{
//				        	if(loginService.getCookie('address')!=0){
					        	$scope.wx_config()
//				        	}
				        }
                        //执行获取用户地址
                        $scope.getUserAddress=function(){
                        	wx.openAddress({
					            trigger: function (res) {
					              //alert('用户开始拉出地址');
					            },
					            success: function (res) {
					              //alert('用户成功拉出地址');
					              $scope.address={"userName":res["userName"],
					              				"userPhone":res["telNumber"],
					              				"userPostal":res["addressPostalCode"],
					              				"userArea":res["provinceName"]+res["cityName"],
					              				"userAddress":res["provinceName"]+res["cityName"]+res["detailInfo"]}
					              //永久存入cookie
					              loginService.putCookieForever("user_address",$scope.address) 
					              location.reload(true)
					            },
					            cancel: function (res) {
					              //alert('用户取消拉出地址');
					            },
					            fail: function (res) {
					              //alert(JSON.stringify(res));
					              console.log(res)
					            } 
					          });
                        }
                        $scope.btnOk=function(){
                            $scope.isShowDialog=false
                        }
                    	$scope.gotoPay=function(){
                            if($scope.address.userPhone==""){
                            	$scope.isShowDialog=true
                            	$scope.dialog_content=$scope.address.userName
                            	return
                            }
                            var pay_data = util.get("pay_data")
                			 WeixinJSBridge.invoke('getBrandWCPayRequest',pay_data,function(res){
									WeixinJSBridge.log(res.err_msg);
					// 				alert(res.err_code + res.err_desc + res.err_msg);
						            if(res.err_msg == "get_brand_wcpay_request:ok"){  
						                //alert("微信支付成功!"); 
						                var post_data=$scope.address
						                post_data["orderId"]=pay_data.orderId
						                //先执行，求优化方案
						                httpService.post($rootScope.baseURL+'weixin/finishpay.do',post_data)
				                        	.then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
												if(data){
													$(".personal").click()
												}
				                        });
						                $scope.timer = $interval( function(){
										    httpService.post($rootScope.baseURL+'weixin/finishpay.do',post_data)
				                        	.then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
												if(data){
													$interval.cancel($scope.timer)
													$(".personal").click()
												}
				                        });
										  }, 4000,3);
						                
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
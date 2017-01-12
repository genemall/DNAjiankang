angular.module('personal', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("personal", {
                    url: '/personal/:id',
                    templateUrl: 'view/personal.html',
                    resolve: {
						user_detail: function (httpService,$rootScope,util) {
	                        return httpService.get($rootScope.baseURL+'user/phoneUserId.do?userId='+util.get("userId"))
	                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                return data;
	                            });
	                    },
	                	order_list: function (httpService,$rootScope,util) {
	                        return httpService.get($rootScope.baseURL+'order/phoneGetOrdersByUserId.do?userId='+util.get("userId"))
	                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                return data;
	                            });
	                    },
	                },
	                controller: function($scope,httpService,user_detail,order_list,util,$rootScope,$stateParams){
                        $scope.user_id=util.get("userId")
                        $scope.headImgurl=user_detail.headImgurl
                        $scope.nickname=user_detail.nickname
                        
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
                        var count_dict = {'unPay':0,'unDeliver':0,'unTake':0} //初始化count字典
                         for(var i=0;i<order_list.length;i++){
                             switch(order_list[i].ordState)
                             {
                                 case "1":
                                    count_dict['unPay'] += 1
                                    break;
                                 case "2":
                                    count_dict['unDeliver'] += 1
                                    break;
                                 case "5":
                                 	break;
                                 default:
                                    count_dict['unTake'] += 1
                                    break;
                             }
                         }
                         $scope.order_count =count_dict //双向绑定赋值前端
                         
                         $(".personal").click()
	                    /*
                    	$scope.orders=order_list
                    	for item in order_list
                    		item[item.ordState] = item[ordState]+lenth(order_list)
                    		$scope.order_unpay = order_list.mapOrderProductList[ordState:1]
                    	*/
                    },

                })
        }
    ])
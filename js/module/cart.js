/**
 * 我的购物车页面路由模块
 */

angular.module('cart', ['ui.router','cartMd'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("cart", {
                    url: '/cart/:id',
                    templateUrl: 'view/cart.html',
                    resolve: {
	                	cart_list: function (httpService,$rootScope,util) {
	                        return httpService.get($rootScope.baseURL+'cart/phonecartsel.do?userId='+util.get("userId"))
//	                        return httpService.get($rootScope.baseURL+'cart/phonecartsel.do?userId='+1)
	                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
	                             if(!data){
	                                 return new Array();
	                             }
	                             var data_list=data.listOrderProduct;
	                             for (var i = 0; i < data_list.length; i++) {
	                                 data_list[i]['check'] = false
	                                 data_list[i]['totalPrice']=data_list[i].proCount * data_list[i].product.proRateprice;
	                             }
	                             return data_list;
	                        });
	                    },
	                },
                    controller:function($scope,cart_list,httpService,$rootScope,$location,util){
                    	//http://blog.csdn.net/liaodehong/article/details/52493779
                    	$scope.cart_datas=cart_list;
                    	$scope.$watch("cart_datas", function() {//监控数据变化
                            $scope.cart_total = 0;
                            count=0
                            for (var i = 0; i < $scope.cart_datas.length; i++) {
                                if($scope.cart_datas[i].check && $scope.cart_datas[i].totalPrice){//不能为NAN
                                    $scope.cart_total += $scope.cart_datas[i].totalPrice;
                                    count++;
                                }
                            }
                            $scope.all=(count==$scope.cart_datas.length);
                        }, true);
                        $scope.update_cart_pro_count = function(proId,count) {
    		               for (var i = 0; i < $scope.cart_datas.length; i++) {
                                if ($scope.cart_datas[i].proId == proId) {
                                    temp=$scope.cart_datas[i].proCount + count
                                    if(temp>0&&temp<=$scope.cart_datas[i].product.proSum){
                                        $scope.cart_datas[i].proCount = temp;
                                        $scope.cart_datas[i].totalPrice = $scope.cart_datas[i].product.proRateprice*$scope.cart_datas[i].proCount;
                                    }
                                }
                            }
    		            }
                        $scope.change = function (proId,proCount) {
                            for (var i = 0; i < $scope.cart_datas.length; i++) {
                                if($scope.cart_datas[i].proId == proId ){
    	                        	$scope.cart_datas[i].proCount=1;
    	                        	if (proCount>$scope.cart_datas[i].product.proSum){
    	                        	    $scope.dialog_content='商品的库存没那么多'
    	                        	    $scope.isShowCartDialog=true
    	                        	}else if (proCount<1){
    	                        	    $scope.dialog_content='商品个数不能小于1'
                                        $scope.isShowCartDialog=true
    	                        	}else if (!proCount){
    	                        	    $scope.dialog_content='商品个数输入异常'
                                        $scope.isShowCartDialog=true
    	                        	}else{
                                        $scope.cart_datas[i].proCount = proCount;
    	                        	}
                                    $scope.cart_datas[i].totalPrice = $scope.cart_datas[i].product.proRateprice*$scope.cart_datas[i].proCount;
                                }
                           }
                        }
                        $scope.btnOk=function(){
                            $scope.isShowCartDialog=false
                        }
                        $scope.checkAll=function(){
                            for(var i in $scope.cart_datas){
                                 $scope.cart_datas[i].check=$scope.all;
                            }
                        }
                        $scope.deleteSelect=function(){
                            //发送httpServer 的post请求
//                          $scope.cart_datas.splice(i,1);
//                          i--; //删除会破坏索引，-1是找下一位
                            var tmp_datas = new Array()
                            var ids = new Array()
                            for (var i = 0; i < $scope.cart_datas.length; i++) {
                                if($scope.cart_datas[i].check){
                                	ids.push($scope.cart_datas[i].id)
                                }else{
                                	tmp_datas.push($scope.cart_datas[i])
                                }
                            }
                            if(ids.length==0){
                            	$scope.dialog_content='请选择相应商品'
                                $scope.isShowCartDialog=true
                                return
                            }
                            $scope.loadingToastHide = 1
                            httpService.get($rootScope.baseURL+'cart/phonecartdel.do?maproIds='+ids.join(","))
                            .then(function (data) {
                            	if(data){
                            		$scope.loadingToastHide = 0
                            		$scope.cart_datas=tmp_datas
                            	}
                            });
                                    
                        }
                        $scope.createOrder=function(){
                            //此次按照check选中的商品生成http post请求，并$location跳转到 订单详情界面
                            var orderDetail_datas = new Array()
                            var orderProducts=new Array()
                            for (var i = 0; i < $scope.cart_datas.length; i++) {
                            	var temp = $scope.cart_datas[i]
                                if(temp.check){
                                	orderProducts.push({
                                		'proId':temp.proId,
              							"proCount":temp.proCount,
          								'proPrice':temp.product.proRateprice,
                                	})
                                	orderDetail_datas.push({
                                		"proPrice":	temp.product.proRateprice,	
                                		"proCount":temp.proCount,
                                		"product":{
	                                		"proName":temp.product.proName,
	                                		"productPrice":temp.product.productPrice,
	                                		"imagelist":temp.product.imagelist
                                		}
                                	})
                                	if(temp.proCount>temp.product.proSum){
						    			$scope.dialog_content='部分商品库存不足，请检查后提交'
			                            $scope.isShowCartDialog=true
			                            return
			    					}
                                }
                            }
                            if(orderProducts.length==0){
                            	$scope.dialog_content='请选择相应商品'
                                $scope.isShowCartDialog=true
                                return
                            }
                            $scope.loadingToastHide = 1
                            //赋值给 orderPay界面
                           // ofzXwvnbUQYrVMmYn8uxZuHbbX5g
							var post_data={'openId':util.get("openId"),'finalmoney':$scope.cart_total,
											"orderProducts":angular.toJson(orderProducts)}
		                  	httpService.post($rootScope.baseURL+'weixin/topay.do',post_data)
		                           .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
		                              console.log(data)
		                              util.set("pay_data",data)
		                              util.set("orderPay",{"ordPrice":$scope.cart_total,
		                              			"mapOrderProductList":orderDetail_datas})
	                               	  $scope.loadingToastHide = 0
	                               	  util.set('from_order',1)
		                              $location.path('/orderPay/')
		                      });
                        }
                        $(".cart").click()
                    },
                    //配置导航，回到父层
                    ncyBreadcrumb:{
                        label:"我的购物车",
                        parent:"home.main"
                    }
                })
        }
    ])
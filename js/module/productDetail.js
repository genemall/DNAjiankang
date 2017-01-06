
var pdModule=angular.module('productDetail', ['ui.router','ksSwiper']);
pdModule.config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state("productDetail", {
                url: '/productDetail/:id',
                templateUrl: 'view/productDetail.html',
                 resolve: {
	                	product_details: function (httpService,$rootScope,$stateParams) {
	                        return httpService.get($rootScope.baseURL+'product/phoneOneProduct.do?ProductId='+$stateParams.id)
	                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
	                                return data;
	                            });
	                    },
	            },
                controller: function($scope,product_details,util,httpService,$rootScope,$state,$location,$interval){
                	$scope.productId=product_details.id;
                	 $scope.product=product_details;
                	$('#productDetail').html(product_details.proDetail);	
//              	$scope.images = [{"url": "./resource/img/5.jpg","link":'#'},
//			                     {"url": "./resource/img/2.jpg","link":'#'},
//			                     {"url": "./resource/img/3.jpg","link":'#'}];
					$scope.images=product_details.imagelist
    			    $scope.mask=false;
    			    $scope.showModal = function () {
    			     $scope.mask = true;
    			    };
    			     $scope.close = function () {
    			      $scope.mask = false;
    			    };
    			    $scope.confirm_yes = false;
    			    $scope.confirm_pay = false;
//  			     
    			     $scope.button_state_change = function (){ //jiaru gou wuche s
//  			      
    			      $scope.confirm_yes = true;
    			      $scope.confirm_pay = false;
    			     };
    			      $scope.button_state_change1 = function (){
//  			      
    			      $scope.confirm_pay = true;
    			       $scope.confirm_yes = false;
    			     };
    			     $scope.button_state_changere = function (){
//  			      $scope.button_state=true
    			      $scope.confirm_yes = false;
    			      $scope.confirm_pay = false;
    			     };
    			     
    			    $scope.goBack=function(){
    			    	$state.go($rootScope.previousState_name, $rootScope.previousState_params);
    			    }
//              
			      /**购买数量加/减/输入数量代码开始**/
			      //添加数量
    			    $scope.skunum = 1;
    			    $scope.addNum = function (num) {
    			      if (num < product_details.proSum) {
    			        $scope.skunum = parseInt($scope.skunum) + 1
    			        if ($scope.skunum > product_details.proSum) {
    			          $scope.skunum = num;
    			        }
    			        return;
    			      }
    			    }
    			    //失去获取焦点
    			    $scope.focusFun = function (num) {
    			      $scope.skunumVal = num;
    			    }
    			    $scope.blurFun = function (num) {
    			      var reg = /^[1-9][0-9]{0,3}$/;
    			      if (!reg.test(num)) {
    			        $scope.skunum = $scope.skunumVal;
    			      }
    			      if (!(num <= product_details.proSum)) {
    			        $scope.skunum = $scope.skunumVal;
    			      }
    			    }
			    /**购买数量加/减/输入数量代码开始**/
			   
//		    		console.log(util.get("userId"))
			    	$scope.addcart = function (){
			    		$scope.mask=false;
			    		var post_data={'proId':$scope.productId,'userId':util.get("userId"),'procount':$scope.skunum}
			    		console.log(post_data)
			    		$scope.loadingToastHide = 1;
			    		httpService.post($rootScope.baseURL+'cart/phonecartadd.do',post_data)
		                    	  .then(function (data) {
	                              $scope.loadingToastHide = 0;
		                            if(data){
			                            $scope.mask = false;
	                    	  			$scope.isShowToast = 1;
								        $interval(function() {
								            $scope.isShowToast = 0;
								        }, 1500, 1);
                                	}
			                 });
			    	}
			    	
			    	$scope.topay = function (){
			    		$scope.mask = false;
			    		$scope.loadingToastHide = 1
			    		var orderDetail_datas = new Array()
			    		var orderProducts=new Array();
			    		orderProducts.push({'proId':$scope.productId,
                  							"proCount":$scope.skunum,
              								'proPrice': $scope.product.proRateprice})
			    		
			    		orderDetail_datas.push({
                                		"proPrice":	$scope.product.proRateprice,	
                                		"proCount":$scope.skunum,
                                		"product":{
	                                		"proName":$scope.product.proName,
	                                		"productPrice":$scope.product.productPrice,
	                                		"imagelist":$scope.product.imagelist
                                		}
                                	})
			    		var finalmoney = $scope.skunum * $scope.product.proRateprice
			    		var post_data={'openId':util.get("openId"),'finalmoney':finalmoney,
			    		'orderProducts':angular.toJson(orderProducts)}
		    			httpService.post($rootScope.baseURL+'weixin/topay.do',post_data)
	                           .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
	                              util.set("pay_data",data)
	                              util.set("orderPay",{"ordPrice":finalmoney,
		                              			"mapOrderProductList":orderDetail_datas})
                               	  $scope.loadingToastHide = 0
                               	  util.set('from_order',1)
	                              $location.path('/orderPay/')
	                      });
			    	}
			   },
            })

    }
])



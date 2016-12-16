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
	                	cart_list: function (httpService,$rootScope,$stateParams) {
	                        return httpService.get($rootScope.baseURL+'cart/phonecartsel.do?userId='+$stateParams.id)
	                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
	                             data_list=data.listOrderProduct;
	                             for (var i = 0; i < data_list.length; i++) {
	                                 data_list[i]['check'] = false
	                                 data_list[i]['totalPrice']=data_list[i].proCount * data_list[i].product.proRateprice;
	                             }
	                             return data_list;
	                        });
	                    },
	                },
                    controller:function($scope,cart_list,httpService,$rootScope){
                    	//http://blog.csdn.net/liaodehong/article/details/52493779
                    	$scope.cart_datas=cart_list;
                    	$scope.$watch("cart_datas", function() {//监控数据变化
                            $scope.cart_total = 0;
                            count=0
                            for (var i = 0; i < $scope.cart_datas.length; i++) {
                                if($scope.cart_datas[i].check){
                                    $scope.cart_total += $scope.cart_datas[i].totalPrice;
                                    count++;
                                }
                            }
                            $scope.all=(count==$scope.cart_datas.length);
                        }, true);
                        $scope.update_cart_pro_count = function(proId,count) {
    		               for (var i = 0; i < $scope.cart_datas.length; i++) {
                                if ($scope.cart_datas[i].proId == proId) {
                                    $scope.cart_datas[i].proCount = $scope.cart_datas[i].proCount + count;
                                    $scope.cart_datas[i].totalPrice = $scope.cart_datas[i].product.proRateprice*$scope.cart_datas[i].proCount;
                                }
                            }
    		            }

                        $scope.checkAll=function(){
                            for(var i in $scope.cart_datas){
                                 $scope.cart_datas[i].check=$scope.all;
                            }
                        }
                        $scope.deleteSelect=function(){
                            //发送httpServer 的post请求
                            for (var i = 0; i < $scope.cart_datas.length; i++) {
                                if($scope.cart_datas[i].check){
                                    httpService.get($rootScope.baseURL+'cart/phonecartdel.do?maproId='+$scope.cart_datas[i].proId)
                                    $scope.cart_datas.splice(i,1);
                                    i--; //删除会破坏索引，-1是找下一位
                                }
                            }
                        }
                        $scope.createOrder=function(){
                            //此次按照check选中的商品生成http post请求，并$location跳转到 订单详情界面
                        }
                    },
                    //配置导航，回到父层
                    ncyBreadcrumb:{
                        label:"我的购物车",
                        parent:"home.main"
                    }
                })
        }
    ])
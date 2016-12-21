
var pdModule=angular.module('productDetail', ['ui.router']);
sliderTest(pdModule,'slider_pd');
pdModule.config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state("productDetail", {
                url: '/productDetail/:id',
                templateUrl: 'view/productDetail.html',
                controller: function($scope){
                	 $scope.data = [{img: "./resource/img/5.jpg",link:'#'},
			                     {img: "./resource/img/2.jpg",link:'#'},
			                     {img: "./resource/img/3.jpg",link:'#'}];
    			    $scope.mask=false;
    			    $scope.showModal = function () {
    			     $scope.mask = true;
    			    };
    			     $scope.close = function () {
    			      $scope.mask = false;
    			    };
    			    $scope.confirm_yes = false;
    			      $scope.confirm_pay = false;
    			      $scope.button_state=true;
    			     $scope.button_state_change = function (){
    			      $scope.button_state=false,
    			      $scope.confirm_yes = true
    			     };
    			      $scope.button_state_change1 = function (){
    			      $scope.button_state=false,
    			      $scope.confirm_pay = true
    			     };
    			     $scope.button_state_changere = function (){
    			      $scope.button_state=true,
    			      $scope.confirm_yes = false,
    			      $scope.confirm_pay = false
    			     };
//              $scope.skunum = 1;
//				$scope.pro_add = function () {
//			     	if($scope.skunum < 1){
//			     		$scope.skunum = 1
//			     	}else if($scope.skunum < 1101){
//			     		$scope.skunum ++
//			     	}else{
//			     		$scope.skunum = 1101  //获取商品库存数
//			     	}
//			     };
			      /**购买数量加/减/输入数量代码开始**/
			      //添加数量
    			    $scope.skunum = 1;
    			    $scope.addNum = function (num, res) {
    			      if (num < res) {
    			        $scope.skunum = parseInt($scope.skunum) + 1
    			        if ($scope.skunum > 1101) {
    			          $scope.skunum = num;
    			        }
    			        return;
    			      }
    			    }
    			    //失去获取焦点
    			    $scope.focusFun = function (num) {
    			      $scope.skunumVal = num;
    			    }
    			    $scope.blurFun = function (num, res) {
    			      var reg = /^[1-9][0-9]{0,3}$/;
    			      if (!reg.test(num)) {
    			        $scope.skunum = $scope.skunumVal;
    			      }
    			      if (!(num <= res)) {
    			        $scope.skunum = $scope.skunumVal;
    			      }
    			    }
			    /**购买数量加/减/输入数量代码开始**/
			   },
            })

    }
])



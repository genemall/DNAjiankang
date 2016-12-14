
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
			     $scope.skunum = 4;
			     $scope.pro_add = function () {
			     	if($scope.skunum < 1101){
			     		$scope.skunum ++
			     	}else{
			     		$scope.skunum = 1101
			     	}		     	  
			     }             
                },
            })
          
    }
])

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
                },
            })
          
    }
])
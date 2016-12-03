
var pdModule=angular.module('productDetail', ['ui.router']);
sliderTest(pdModule,'slider_pd');
pdModule.config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state("productDetail", {
                url: '/productDetail',
                templateUrl: 'view/productDetail.html',
                controller: function($scope){
                	 $scope.data = [{img: "./resource/img/5.jpg",link:'#'},
			                     {img: "./resource/img/2.jpg",link:'#'},
			                     {img: "./resource/img/3.jpg",link:'#'}];
                },
            })
          
    }
])
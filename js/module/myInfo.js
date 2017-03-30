
angular.module('myInfo', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("myInfo", {
                    url: '/myInfo',
                    templateUrl: 'view/myInfo.html',
                    controller: function($scope,loginService){
                    	$scope.delectAll=function(){
                    		loginService.putCookieForever("userId",null)
                    		loginService.putCookieForever("openId",null)
                    	}
                    },
                })
        }
    ])
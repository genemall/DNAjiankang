/**
 * home page
 */

angular.module('home', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("home", {
                    url: '/home',
                    templateUrl: 'view/home.html',
                    resolve: {
                        productsResolve: function (httpService) {
                            return httpService.get('json/products.json');
                        },
                        productObj: function (httpService, util,$state) {
                            return httpService.get('json/products.json')
                                .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                    return util.queryItemById(data.products, 1);
                                });
                        },
                    },
                     controller: function ($scope, $stateParams,$rootScope) {
                            $scope.thisIsExample = function (data) {
                                    console.log($rootScope.user+'--'+data)
                            }
                      }

                })
                .state("error404",{
                    url:'/error404',
                    templateUrl: 'view/404.html',
                    controller:function($scope,$stateParams){
                    }
                })
        }
    ])
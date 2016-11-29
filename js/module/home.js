/**
 * home page
 */

angular.module('home', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("home", {
                    url: '/home',
                    abstract:true,
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
                    }
                })
                .state("home.main",{
                    url:'',
                    views: {
                        "":{
                            templateUrl: 'view/home.html',
                            controller:function(){}
                        },
                    },
                })

                .state("home.search",{ //搜索产品信息
                    url:'/search/:searchKey',
                    templateUrl: 'view/page/home.search.html',
                    controller:function($scope,$stateParams,productsResolve,util){
                        //TODO:搜索功能没有实现，暂时返回所有的产品
                        //$scope.searchResultList=util.queryArrByField(productsResolve.products,$stateParams.searchKey,"name");
                        $scope.searchResultList = productsResolve.products;
                    },
                })
                .state("error404",{
                    url:'/error404',
                    templateUrl: 'view/404.html',
                    controller:function($scope,$stateParams){
                    }
                })
        }
    ])
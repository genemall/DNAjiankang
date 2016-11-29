/**
 * 立即购买页面路由模块
 */

angular.module('buyNow', ['ui.router','cartMd'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('buyNow', {
                    url: '/buyNow/:productId',
                    resolve: {
                        productsResolve: function (httpService) {
                            return httpService.get('json/products.json');
                        }
                    },
                    views: {
                        "": {
                            templateUrl: 'view/buyNow.html',
                            controller: function ($scope, $stateParams, productsResolve, util, $window,$location,$anchorScroll,cartService,$state,$rootScope) {
                                $scope.userSelectArr = [];//存放用户选择的产品信息
                                $scope.buyProduct = util.queryItemById(productsResolve.products, $stateParams.productId);//用户购买的产品对象
                                $scope.buyProductVersions = util.queryArrByField(productsResolve.versions_info, $stateParams.productId, "p_id"); //产品对象的版本信息
                                $scope.buyProductColors = productsResolve.color_base;//产品对象的版本信息
                                //第一步选择版本
                                $scope.pushUserSelectVersion = function (userSelect) {

                                    $scope.userSelectVersion = [userSelect];
                                    //$scope.userSelectArr.pushObj(userSelect);
                                    //util.sava("userSelect", $scope.userSelectArr);
                                    $scope.userSelectArr = $scope.userSelectVersion;

                                    $scope.userSelectColor = [];

                                    $scope.buyProduct.price = userSelect.price;
                                    $scope.buyProductColors = util.queryArrByField(productsResolve.color_info, userSelect.versionId, "b_id");
                                };

                                $scope.goToDivId = function (id) {
                                    $location.hash(id);
                                    $anchorScroll();
                                }

                            }
                        }
                    }
                })
        }
    ])


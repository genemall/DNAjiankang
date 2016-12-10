/**
 * home page
 */

//angular.module('home', ['ui.router'])
var homeModule = angular.module('home', ['ui.router']);
sliderTest(homeModule,'slider');
homeModule.config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state("home", {
                url: '/home',
                templateUrl: 'view/home.html',
                resolve: { //预加载的功能，在页面渲染出现之前，提前加载这些数据，并在controller中引用
                	classifyResolve: function (httpService,$rootScope) { //定义预加载的函数
                        return httpService.get($rootScope.baseURL+'classify/phoneclsall.do') //通过Service获取接口对应的json数据
                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                return data.classifies; //对返回的数据进行处理
                            });;
                    },
                    /*
                    productObj: function (httpService, util,$state) {
                        return httpService.get('json/products.json')
                            .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                return util.queryItemById(data.products, 1);
                            });
                    },
                    */
                },
                 controller: function ($scope,$stateParams,$rootScope,classifyResolve) {
                    $scope.classifies=classifyResolve //双向绑定 数据和前段的标签，此处为 商品分类的循环
                    
                    //以下是幻灯片展示部分，可以不看
                    $scope.data = [{img: "./resource/img/5.jpg",link:'#'},
			                     {img: "./resource/img/2.jpg",link:'#'},
			                     {img: "./resource/img/3.jpg",link:'#'}];
			        //以下是搜索部分，可不看
			        $scope.focusing = ''; //获得焦点时增加样式weui_search_focusing
                    $scope.isSearchShow = false; //是否显示搜索框的下拉列表
                    $scope.searchInput = ''; //搜索内容清空
                    $scope.searchText = true; //是否显示默认状态下的搜索条样式
                    $scope.searchClickEvent = function() {
                        $scope.searchText = false;
                        document.getElementById('searchInput').focus();
                    }

                    $scope.searchFocusEvent = function() {
                        $scope.focusing = 'weui-search-bar_focusing';
                    }

                    $scope.searchBlurEvent = function() {
                        $scope.searchText = true;
                        //$scope.focusing = '';
                        //$scope.isSearchShow = false;
                        $scope.searchInput = '';
                    }
                    $scope.searchCancel = function(){
                        $scope.searchText = true;
                        $scope.focusing = '';
                        $scope.isSearchShow = false;
                    }
                    $scope.searchKeyupEvent = function() {
                        if ($scope.searchInput) {
                            $scope.isSearchShow = true;
                        } else {
                            $scope.isSearchShow = false;
                        }
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
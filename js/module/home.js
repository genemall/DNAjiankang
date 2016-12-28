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
                url: '/home/:userId/:openId',
                templateUrl: 'view/home.html',
                resolve: { //预加载的功能，在页面渲染出现之前，提前加载这些数据，并在controller中引用
                	classifyResolve: function (httpService,$rootScope) { //定义预加载的函数
                        return httpService.get($rootScope.baseURL+'classify/phoneclsall.do') //通过Service获取接口对应的json数据
                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                return data.classifies; //对返回的数据进行处理
                            });;
                    },
                    products: function (httpService, $rootScope) {
                        return httpService.get($rootScope.baseURL+'product/phoneall.do')
                            .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                return data;
                            });
                    },
                
                },
                 controller: function ($scope,$stateParams,$rootScope,$filter,classifyResolve,products,loginService,util) {
                    $scope.sliderShow=true
                    $scope.classifies=classifyResolve //双向绑定 数据和前段的标签，此处为 商品分类的循环
                    $scope.$watch("searchInput", function() {//监控数据变化
                        $scope.products=$filter("filter")(products,$scope.searchInput);
                    }, true);
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
                        $scope.sliderShow=false
                    }

                    $scope.searchFocusEvent = function() {
                        $scope.focusing = 'weui-search-bar_focusing';
                    }

                    $scope.searchBlurEvent = function() {
                        $scope.searchText = true;
                    }
                    $scope.searchCancel = function(){
                        $scope.searchText = true;
                        $scope.focusing = '';
                        $scope.isSearchShow = false;
                        $scope.sliderShow=true
                    }
                    $scope.searchKeyupEvent = function() {
                        if ($scope.searchInput) {
                            $scope.isSearchShow = true;
                        } else {
                            $scope.isSearchShow = false;
                        }
                    }
                    //放在最后，判断是否重定向
                    if($stateParams.userId!=0||$stateParams.userId!="0"){
             			loginService.putCookie('curUser',{'userId':$stateParams.userId,'openID':$stateParams.openId})
             		}
                	if(loginService.getCookie('curUser') == null){
                		if (util.get("userId") == null){
							window.location.href=$rootScope.baseURL+'weixin/oauth.do'
                		}
					}else{
						var user = loginService.getCookie('curUser')
						util.set('userId',user.userId) 
             			util.set('openId',user.openId) 
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
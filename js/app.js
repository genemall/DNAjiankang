/**
 * 创建总的入口模块：xmStoreApp，它依赖其它所有模块
 */

var dnaStore = angular.module('dnaStore',
    [
        'ui.router',
		"ngCookies",
		
        'home',
        'cart',
        'order',
        'orderDetail',
        'personal',
        'product',
        'productDetail',
        'orderPay',
        'report',
        'reportDetail',
		
        'loginMd',
        'httpMd',
        'cartMd',
    ]
);
dnaStore
    .config(
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home/');
        }
    )
    //配置系统初始需要的数据
    .run(function ($rootScope, httpService, $state, loginService) {
        //用户登录信息绑定在跟作用域下，因为各个状态路由可能都需要涉及登录信息
        //$rootScope.user = loginService.isLogin();
        $rootScope.user = 'shileiding'
		$rootScope.baseURL="http://nbuxinxiren.cn/SpringGene1/"
		//$rootScope.baseURL="http://192.168.0.101:8080/SpringGene1/"
		
		$rootScope.state=1
		if(loginService.login_info() == null){
			$rootScope.state=0
			loginService.login($rootScope.baseURL+'weixin/oauth.do')
		}
		
        $rootScope.outLogin = function () {
            loginService.outLogin();
            $rootScope.user = null;
        }
        //调用服务获取主页需要显示的焦点图
        httpService.get('json/tsconfig.json').then(function (data) {
            $rootScope.imgItems = data.focusImg;
        });
        //调用服务获取分类表的数据
        httpService.get('json/fenlei.json').then(function (data) {
            $rootScope.ulItems = data.fenlei;
        });

        //判定状态改变事件
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            // if (toState.name=='cart'&& !toState.data.loginCheck) {
            //    event.preventDefault();//如果去掉此行则不会跳转到login页面 :最佳解决方案,使用event.preventDefault()可以阻止状态发生改变.
            //    $rootScope.$state.go("login");
            //}
        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            /*  angular.forEach($state.get(),function(state){
             console.log(state.name);
             })*/
            /*if (toState.name=='cart'&& !toState.data.loginCheck) {
             console.error('not login!');
             //可以跳转到login页面，到点击浏览器返回时又回到了cart状态，然后又进入login页面(导致无法返回)
             $rootScope.$state.go("login");
             }*/
            $rootScope.previousState_name = fromState.name;
            $rootScope.previousState_params = fromParams;
        });

        //实现返回上一状态的函数 back button function   ng-click="back()"
        $rootScope.back = function () {
            $state.go($rootScope.previousState_name, $rootScope.previousState_params);
        };
    })





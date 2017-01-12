/**
 * 创建总的入口模块：xmStoreApp，它依赖其它所有模块
 */

var dnaStore = angular.module('dnaStore',
    [
        'ui.router',
		
        'home',
        'cart',
        'order',
        'orderDetail',
        'personal',
        'product',
        'productDetail',
        'orderPay',
        'report',
        
		
        'loginMd',
        'httpMd',
        'cartMd',
        
        "aboutUs",
        "myInfo",
        "question",
        "serviceProcess",
        
    ]
);
dnaStore
    .config(
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home/0/0');
        }
    )
    //配置系统初始需要的数据
    .run(function ($rootScope,httpService,util, $state, $location,loginService) {
        //用户登录信息绑定在跟作用域下，因为各个状态路由可能都需要涉及登录信息
        //$rootScope.user = loginService.isLogin();
        $rootScope.user = 'shileiding'
		$rootScope.baseURL="http://nbuxinxiren.cn/SpringGene1/"
		$rootScope.clientURL="http://nbuxinxiren.cn/DNAjiankang/"
		//$rootScope.baseURL="http://192.168.0.101:8080/SpringGene1/"
//		$scope.userId = util.get("userId")
		if (util.get("userId") == null ){
			util.set("userId",0)//防止再执行,标示
			util.set('share_url',$location.url()) //来之分享页面
			window.location.href=$rootScope.baseURL+'weixin/oauth.do'
		}
		$rootScope.wx_config=function(){
    		msg = loginService.getCookie('address')
        	wx.config(
            {
	            debug: false,
	            appId: msg.appid,
	            timestamp: msg.timestamp,
	            nonceStr: msg.noncestr,
	            signature: msg.signature,
	            jsApiList: [
	              // 所有要调用的 API 都要加到这个列表中
	                'checkJsApi',
	                'openAddress',
	                'onMenuShareAppMessage',
	                'onMenuShareTimeline',
	                'onMenuShareQQ'
	              ]
	          	});
		        wx.checkJsApi({
	    	      jsApiList: [
	    	          'openAddress',
	    	          'onMenuShareAppMessage',
	    	          'onMenuShareTimeline',
                	  'onMenuShareQQ'	
	    	      ],
	    	      success: function (res) {
	    	          //alert(JSON.stringify(res));
	    	      }
			}); 
			httpService.share_link("product_details.proName","product_details.proHead","product_details.imagelist[0].url")
			//wx.hideAllNonBaseMenuItem();
    	}
        //根据cookie判断地址是否配置和加载
        if(loginService.getCookie('address')==null){
        	//获取 address 配置
        	httpService.post($rootScope.baseURL+'weixin/address.do',{})
        	.then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
        		loginService.putCookieForever("address",data) 
        		$rootScope.wx_config()
             });
        }else{
        	$rootScope.wx_config()
        }
        //判定状态改变事件
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        	//console.log(toState)
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
           // $state.go($rootScope.previousState_name, $rootScope.previousState_params);
        };
    })





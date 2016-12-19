
angular.module('product', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state("product", {
                    url: '/product/:id',
                    templateUrl: 'view/product.html',
	                resolve: {
	                	product_list: function (httpService,$rootScope,$stateParams) {
	                        return httpService.get($rootScope.baseURL+'product/phonefirstall.do?clsId='+$stateParams.id)
	                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
	                                return data;
	                            });
	                    },
	                },
                    controller: function($scope,httpService,product_list,$rootScope){
                    	$scope.products=product_list //导航页的三个标签，对应的展示
                    	$scope.products=[{'id':1,'claName':'儿童基因'},{'id':2,'claName':'记忆基因'},
                                        {'id':3,'claName':'营养基因'},{'id':4,'claName':'运动基因'},
                                        {'id':5,'claName':'外貌基因'},{'id':6,'claName':'天赋基因'}]
                    	
                    	$scope.products_show=product_list[0].listProduct//每个标签对应的商品信息，默认是第一个标签
                    	$scope.is_select_id = product_list[0].id //默认选中第一个标签
                    	$scope.getProductsData=function(id){ //点击其他标签，重新获取数据，并在最后的返回中给予赋值
                    		httpService.get($rootScope.baseURL+'product/phoneproall.do?clsId='+id)
	                         .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
	                                $scope.products_show=data;
	                                $scope.is_select_id = id
	                       	});
                    	}
                    },
                })
        }
    ])



$(function(){
    $(".find_nav_list").css("left",sessionStorage.left+"px");
    $(".find_nav_list li").each(function(){
        if($(this).find("a").text()==sessionStorage.pagecount){
            $(".sideline").css({left:$(this).position().left});
            $(".sideline").css({width:$(this).outerWidth()});
            $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
            navName(sessionStorage.pagecount);
            return false
        }
        else{
            $(".sideline").css({left:0});
            $(".find_nav_list li").eq(0).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
        }
    });
    var nav_w=$(".find_nav_list li").first().width();
    $(".sideline").width(nav_w);
    $(".find_nav_list li").on('click', function(){
        nav_w=$(this).width();
        $(".sideline").stop(true);
        $(".sideline").animate({left:$(this).position().left},300);
        $(".sideline").animate({width:nav_w});
        $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
        var fn_w = ($(".find_nav").width() - nav_w) / 2;
        var fnl_l;
        var fnl_x = parseInt($(this).position().left);
        if (fnl_x <= fn_w) {
            fnl_l = 0;
        } else if (fn_w - fnl_x <= flb_w - fl_w) {
            fnl_l = flb_w - fl_w;
        } else {
            fnl_l = fn_w - fnl_x;
        }
        $(".find_nav_list").animate({
            "left" : fnl_l
        }, 300);
        sessionStorage.left=fnl_l;
        var c_nav=$(this).find("a").text();
        navName(c_nav);
    });
    var fl_w=$(".find_nav_list").width();
    var flb_w=$(".find_nav_left").width();
    $(".find_nav_list").on('touchstart', function (e) {
        var touch1 = e.originalEvent.targetTouches[0];
        x1 = touch1.pageX;
        y1 = touch1.pageY;
        ty_left = parseInt($(this).css("left"));
    });
    $(".find_nav_list").on('touchmove', function (e) {
        var touch2 = e.originalEvent.targetTouches[0];
        var x2 = touch2.pageX;
        var y2 = touch2.pageY;
        if(ty_left + x2 - x1>=0){
            $(this).css("left", 0);
        }else if(ty_left + x2 - x1<=flb_w-fl_w){
            $(this).css("left", flb_w-fl_w);
        }else{
            $(this).css("left", ty_left + x2 - x1);
        }
        if(Math.abs(y2-y1)>0){
            e.preventDefault();
        }
    });
});
function navName(c_nav) {
    switch (c_nav) {
        case "儿童基因":
            sessionStorage.pagecount = "儿童基因";
            break;
        case "记忆基因":
            sessionStorage.pagecount = "记忆基因";
            break;
        case "营养基因":
            sessionStorage.pagecount = "营养基因";
            break;
        case "运动基因":
            sessionStorage.pagecount = "运动基因";
            break;
        case "外貌基因":
            sessionStorage.pagecount = "外貌基因";
            break;
        case "天赋基因":
            sessionStorage.pagecount = "天赋基因";
            break;
    }
}
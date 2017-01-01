
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
                    controller: function($scope,httpService,product_list,$rootScope,$stateParams,util){
                    	$scope.products_show=product_list[0].listProduct//每个标签对应的商品信息，默认是第一个标签
                    	//jquery 实现 滑动导航栏,有待改装成angularjs
                    	var arr = new Array()
                        for(var i=0;i<product_list.length;i++){
                        	if(product_list[i].claName==null){
                        		arr.push("<li> <a href='javascript:void(0)' >"+util.get("claName")+"</a></li>")
                        		break
                        	}
                            arr.push("<li> <a href='javascript:void(0)' id='"+product_list[i].id+"'>"+product_list[i].claName+"</a></li>")
                        }
                        arr.push("<li class='sideline'></li>")
                	    $(".find_nav_list ul").append(arr.join(''))
					    $(".find_nav_list li").each(function(){
					            $(".sideline").css({left:0});
					            $(".find_nav_list li").eq(0).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
					    });
					    var nav_w=$(".find_nav_list li").width();
					    $(".sideline").width(nav_w);

					    $(".find_nav_list li a").on('click', function(id){
					        id=$(this).attr("id")
					        httpService.get($rootScope.baseURL+'product/phoneproall.do?clsId='+id)
                             .then(function (data) {//.then()函数里的返回值解析.这适用于对返回值做一些处理后再返回.
                                    $scope.products_show=data;
                            });
					        nav_w=$(this).width();
					        $(".sideline").stop(true);
					        $(".sideline").animate({left:$(this).position().left-27},300);
					        $(".sideline").width(nav_w);
					        $(this).parent().addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
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
					        if(arr.length!=3){//只有两个就不滑动
						        $(".find_nav_list").animate({
						            "left" : fnl_l
						        }, 300);
					        }
					        var c_nav=$(this).find("a").text();
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
                    },
                })
        }
    ])



/**
 * Ajax 服务，调用后台的api接口，完成模型数据的呈现
 */

angular.module("httpMd",[])
	.config(['$httpProvider', function($httpProvider) {
	  $httpProvider.defaults.withCredentials=false;
	}])
    .factory("httpService",function($http,$q){
        return{
            get:function(_urlPath){
                var defer=$q.defer();
                $http({
                    method:'GET',
                    url:_urlPath,
                    })
                    .success(function(data,status,headers,config){
                        defer.resolve(data); //声明执行成功
                    })
                    .error(function(data,status,headers,config){
                        defer.reject(); //声明执行失败，此处可以处理请求失败后的提示或其它业务逻辑
                    });
                return defer.promise; //返回承诺，返回获取数据的API
            },
            post:function(_urlPath,_data){
            	var defer=$q.defer();
                 $http({
                    method:'POST',
                    url:_urlPath,
                    headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
					 },
                    data:$.param(_data), //json格式 或 param格式
                    })
                    .success(function(data,status,headers,config){
                        defer.resolve(data); //声明执行成功
                    })
                    .error(function(data,status,headers,config){
                        defer.reject(); //声明执行失败，此处可以处理请求失败后的提示或其它业务逻辑
                    });
                return defer.promise; //返回承诺，返回获取数据的API
            },
            share_link:function(_title,_desc,_image){
            	wx.onMenuShareTimeline({
				    title: _title, // 分享标题
				    link: '', // 分享链接
				    imgUrl: _image, // 分享图标
				    success: function () { 
				        // 用户确认分享后执行的回调函数
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }
				});
            	wx.onMenuShareAppMessage({
			   	    title: _title, // 分享标题
				    desc: _desc, // 分享描述
				    link: '', // 分享链接
				    imgUrl: _image, // 分享图标
				    type: '', // 分享类型,music、video或link，不填默认为link
				    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				    success: function () { 
				        // 用户确认分享后执行的回调函数
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }
				});
            	wx.onMenuShareQQ({
					    title: _title, // 分享标题
					    desc: _desc, // 分享描述
					    link: '', // 分享链接
					    imgUrl: _image, // 分享图标
					    success: function () { 
					       // 用户确认分享后执行的回调函数
					    },
					    cancel: function () { 
					       // 用户取消分享后执行的回调函数
					    }
				});
            }
        }
    })


/** 设置request 格式
angular.module("app", [])
.config(["$httpProvider", function($httpProvider) {
      $httpProvider.defaults.transformRequest = [
        function(request) {
          return $.param(request);
        }
      ];
    }
]);
*/
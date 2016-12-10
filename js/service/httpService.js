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
                 $http({
                    method:'POST',
                    url:_urlPath,
                    data:_data //json格式 或 param格式
                    })
                    .success(function(data,status,headers,config){
                        defer.resolve(data); //声明执行成功
                    })
                    .error(function(data,status,headers,config){
                        defer.reject(); //声明执行失败，此处可以处理请求失败后的提示或其它业务逻辑
                    });
                return defer.promise; //返回承诺，返回获取数据的API
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
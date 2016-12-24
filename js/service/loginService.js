/**
 * 用户登录信息服务
 */

angular.module("loginMd", ["ngCookies","httpMd"])
    .factory("loginService", function ($cookies,httpService) {
        return {
            //登录
            login: function (outh_url) {
            	httpService.get(outh_url)
            },
            //判断是否登录
            login_info: function () {
                var curUser = $cookies.getObject("curUser");
                if (curUser !== null) {
                    return curUser;
                }
                return null;
            },
            //退出登录
            outLogin: function () {
                this.user = null;
                $cookies.remove("curUser")
            },
            putCookie:function(key,value){
            	var expireDate = new Date();
            	expireDate.setMinutes(expireDate.getMinutes()+5);
				//expireDate.setHours(expireDate.getHours()+2);
               	$cookies.putObject(key,value,{'expires': expireDate});
            },
           	getCookie:function(key){
            	return $cookies.getObject(key);
            },
        }
    })

function User(name, pwd) {
    this.name = name;
    this.pwd = pwd;
}

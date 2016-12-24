/**
 * 用户登录信息服务
 */

angular.module("loginMd", ["ngCookies"])
    .factory("loginService", function ($cookies,httpService) {
        return {
            //登录
            login: function (outh_url) {
            	data = httpService.get(outh_url)
            	var expireDate = new Date();
            	expireDate.setMinutes(expireDate.getMinutes()+5);
				//expireDate.setHours(expireDate.getHours()+2);
               	$cookies.putObject("curUser",data,{'expires': expireDate});
               	return data
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
            }
        }
    })

function User(name, pwd) {
    this.name = name;
    this.pwd = pwd;
}

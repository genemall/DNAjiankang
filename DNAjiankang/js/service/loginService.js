/**
 * 用户登录信息服务
 */

angular.module("loginMd", ["swxLocalStorage"])
    .factory("loginService", function ($localStorage,cartService) {
        return {
            user: {},
            //登录
            login: function (userLogin) {
                //获取存储在 $localStorage中注册的用户
                var oldUser = $localStorage.get(userLogin.name);
                $localStorage.put("curUser", oldUser);
                this.user = oldUser;
                //登陆后根据用户名创建我的购物车
                cartService.createMyCart(this.user.name);
                //返回登陆用户
                return this.user;
            },
            //判断是否登录
            isLogin: function () {
                var oldUser = $localStorage.get("curUser");
                if (oldUser !== null) {
                    //登陆后根据用户名创建我的购物车
                    this.user = oldUser;
                    cartService.createMyCart(this.user);
                    return this.user;
                }
                return null;
            },
            //退出登录
            outLogin: function () {
                this.user = null;
                $localStorage.remove("curUser");
            }
        }
    })

function User(name, pwd) {
    this.name = name;
    this.pwd = pwd;
}

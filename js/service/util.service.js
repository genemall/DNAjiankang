/**
 * 工具类服务：返回一些公共的工具方法
 */

angular.module("utilMd", ["swxLocalStorage"])
    .factory("util", function ($localStorage,loginService) {
        //extend Array [+swap] 一个swap函数的实现
        Array.prototype.swap = Array.prototype.swap || function (new_index, old_index) {
                if (new_index >= this.length) {
                    var k = new_index - this.length;
                    while ((k--) + 1) {
                        this.push(undefined);
                    }
                }
                this.splice(new_index, 0, this.splice(old_index, 1)[0]);
                return this;
            };
        Array.prototype.pushObj = Array.prototype.pushObj || function (obj) {
                if (obj == null)
                    return this;
                if (contains(this, obj) != -1) {
                    return this;
                } else {
                    this.push(obj);
                }
                return this;
            };
		cache_dict={}
        return {
            //通过ID查询某个产品
            queryItemById: function (arr, id) {
                var obj = null;
                angular.forEach(arr, function (item) {
                    if (item.productId == id) {
                        obj = item;
                        return;
                    }
                })
                return obj;
            },
            //通过参数查询某个产品,key为查询值，field为查询的表字段名称
            queryItemByField: function (arr, key, field) {
                var obj = null;
                angular.forEach(arr, function (item, index) {
                    if (item[field].indexOf(key) != -1) {
                        obj = item;
                    }
                })
                return obj;
            },
            //通过参数字段查询某个产品集合,key为查询值，field为查询的表字段名称
            queryArrByField: function (arr, key, field) {
                var tmpArr = [];
                angular.forEach(arr, function (item, index) {
                    if (item[field] == key || item[field].indexOf(','+key+',') != -1) {
                        tmpArr.push(item);
                    }
                })
                return tmpArr;
            },
            //判断一个对象是否存在一个数组里
            contains: function (array, obj) {
                var i = array.length;
                while (i--) {
                    if (array[i].name === obj.name) {
                        return i;
                    }
                }
                return -1;
            },
            get_sum_price:function(order_show){
                for(var i=0;i<order_show.length;i++){
                    var price_sum = 0
                    product_list = order_show[i].mapOrderProductList
                    for(var j=0;j<product_list.length;j++){
                        price_sum += parseInt(product_list[j].proPrice)*parseInt(product_list[j].proCount)
                    }
                    order_show[i]['price_sum']=price_sum //添加订单的总价进原始json
                }
                return order_show
            },
            set:function(key,value){
            	$localStorage.put(key,value)
            },
            get:function(key){
            	var temp = $localStorage.get(key);
                if (temp != null || temp != "") {
                    return temp;
                }
                return loginService.getCookie(key);
            },
           remove:function(key){
           		$localStorage.removeItem(key)
           },
        }
    })
/**
 * Created by Joy-li on 2017/5/7.
 */

/* 自定义一个跨越请求服务对象  -- 处理函数当成构造函数对待 */

(function (angular) {
    'use strict';
    angular.module('moviecat.services.httpJsonp', [])
        .service('httpJsonp', ['$window', '$document', function ($window, $document) {

            this.$jsonp = function (url,data,callback) {
                /* 挂载回调函数 */
                var cbName = 'my_jsonp' + new Date().getTime();
                $window[cbName] = function (data) {
                    callback(data);
                    /* 数据处理完毕后，删除append进来的script标签 -- 防止index文件不断增大 */
                    $document[0].body.removeChild(scriptEle);
                };
                /* 处理url */
                var searchStr = url.indexOf('?') == -1 ? '?' : "&";
                for (var key in data) {
                    searchStr += key + '=' + data[key] + '&';
                }
                var cb = 'callback=' + cbName;
                /* 创建script标签并append到html中 -- 执行回调函数 */
                var scriptEle = $document[0].createElement('script');
                scriptEle.src = url + searchStr + cb;
                scriptEle.type = 'text/javaScript';
                $document[0].body.appendChild(scriptEle);
            }
        }])


})(angular);
(function (angular) {

    'use strict';

    angular.module('moviecat', [
        'ngRoute',
        'moviecat.movie_detail',
        'moviecat.movie_list',
        'moviecat.directives.searchMovie',
        'moviecat.directives.autoFocus'
    ])
        /* 路由配置 -- 其他情况path值的重定向 */
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.otherwise({
                redirectTo: '/in_theaters/1'
            })
        }])
        /* 常量服务对象配置 */
        .constant('appConfig', {
            pageSize : 10,
            'listApiAddress' : 'http://api.douban.com/v2/movie/',
            detailApiAddress : 'http://api.douban.com/v2/movie/subject/',
            showPage : 7
        })



})(angular);
/**
 * Created by Joy-li on 2017/5/7.
 */

(function (angular) {

    'use strict';

    angular.module('moviecat.movie_detail', [
        'ngRoute',
        'moviecat.services.httpJsonp',
        'moviecat.directives.cssLoading'
    ])
        /* 路由配置 -- 子模块配置各自的路由表 */
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/detail/:id', {
                    templateUrl: '/app/movie_detail/view.html',
                    controller: 'movieDetailController'
                })

        }])
        /* 子模块控制器 */
        .controller('movieDetailController', [
            '$scope',
            '$routeParams',
            '$route',
            'appConfig',
            'httpJsonp',
            function ($scope, $routeParams, $route, appConfig, httpJsonp) {

                /* 控制是否显示页面内容 */
                $scope.showContent = true;

                /* 数据模型搭建 */
                $scope.movie = {};

                var movieListApiAddress = appConfig.detailApiAddress + $routeParams.id;

                httpJsonp.$jsonp(
                    movieListApiAddress,
                    {},
                    function (data) {
                        $scope.movie = data;
                        $scope.showContent = false;
                        $scope.$apply();
                    }
                )

            }])

})(angular);
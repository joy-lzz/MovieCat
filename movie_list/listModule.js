/**
 * Created by Joy-li on 2017/5/7.
 */

(function (angular) {

    'use strict';

    angular.module('moviecat.movie_list', [
        'ngRoute',
        'moviecat.services.httpJsonp',
        'moviecat.directives.cssLoading',
        'moviecat.directives.cutPage'
    ])
        /* 路由配置 -- 子模块配置各自的路由表 */
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/:category/:page', {
                    templateUrl: './movie_list/view.html',
                    controller: 'movieListController'
                })

        }])
        /* 子模块控制器 */
        .controller('movieListController', [
            '$scope',
            '$routeParams',
            '$route',
            'appConfig',
            'httpJsonp',
            function ($scope, $routeParams, $route, appConfig, httpJsonp) {

                /* 控制是否显示页面内容 */
                $scope.showContent = true;

                /* 分页设置 */
                var count = appConfig.pageSize;
                $scope.page = parseInt($routeParams.page);
                var start = ($scope.page - 1) * count;

                /* 分页按钮 */
                /* 前进后退页 */
                $scope.goPage = function (page) {
                    if (page>=1&&page<=$scope.totalPage)
                    $route.updateParams({
                        page : page
                    })
                };
                /* 首页 */
                $scope.firstPage = function () {
                    $route.updateParams({
                        page : 1
                    })
                };
                /* 末页 */
                $scope.endPage = function () {
                    $route.updateParams({
                        page : $scope.totalPage
                    })
                };


                /* 数据模型搭建 */
                $scope.title = 'Loading';
                $scope.subjects = [];
                $scope.total = 0;
                $scope.totalPage = 0;

                var movieListApiAddress = appConfig.listApiAddress + $routeParams.category;

                httpJsonp.$jsonp(
                    movieListApiAddress,
                    {
                        start: start,
                        count: count,
                        q : $routeParams.q == '' ? '黄渤' : $routeParams.q
                    },
                    function (data) {
                        $scope.title = data.title;
                        $scope.subjects = data.subjects;
                        $scope.total = data.total;
                        $scope.totalPage = Math.ceil(data.total / count);
                        $scope.showContent = false;
                        $scope.$apply();
                    }
                )

            }])

})(angular);
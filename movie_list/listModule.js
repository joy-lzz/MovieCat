/**
 * Created by Joy-li on 2017/5/7.
 */

(function (angular) {

    'use strict';

    angular.module('moviecat.movie_list', [
        'ngRoute',
        'moviecat.services.httpJsonp',
        'moviecat.directives.cssLoading',
        /* 分页控制导航更换为pagination */
        /*'moviecat.directives.cutPage',*/
        'moviecat.directives.pagination'
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
                $scope.pageArr = [];
                $scope.showPage = appConfig.showPage;

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
                        /* pagination操作实现  -- 数据请求回来后才执行！ */
                        /* 获得页码范围数组 */
                        $scope.pageArr = getPageArr($scope.page,$scope.showPage,$scope.totalPage);

                        $scope.$apply();
                    }
                );

                /* 获得页码范围数组函数 */
                function getPageArr(current,showPage,totalPage) {
                    var pageArr = [];
                    var deviation = Math.ceil((showPage - 1) / 2);
                    /* 开始页 */   //normal： 1 至 (total - showPage + 1)
                    var begin = current - deviation;
                    /* 开始页的安全校验  -- begin与total值和1紧密相关 */
                    if (begin < 1) {
                        begin = 1;
                    } else if (begin > (totalPage - showPage + 1)) {
                        begin = totalPage - showPage + 1;
                    }
                    /*当total小于showPage --> begin>1，且begin> (total - showPage + 1),再次校验begin，让begin=1 */
                    if (begin < 1) {
                        begin = 1;
                    }
                    /* 结束页 */   //范围： showPage 至 total
                    var end = begin + showPage - 1;
                    /* 结束页安全校验 -- 当total小于showPage时，可能会出错，所以需要安全校验！ */
                    if (end > totalPage) {
                        end = totalPage;
                    }
                    for (var i = begin; i <= end; i++) {
                        pageArr.push(i);
                    }
                    return pageArr;
                }












            }])

})(angular);
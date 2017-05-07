/**
 * Created by Joy-li on 2017/5/7.
 */
(function (angular) {

    'use strict';

    angular.module('moviecat.directives.searchMovie', [])
        .directive('searchMovie', [function () {
            return {
                restrict: 'EA',
                /* 这个控制器绑定指令所在元素,注入的angular默认对象必须写在控制器函数中 */
                controller : 'searchMovieController'
            }

        }])
        .controller('searchMovieController',['$scope', '$location' , function ($scope,$location) {
            $scope.content = '';
            $scope.searchMovie = function () {
                /* 更改path值和查询条件search值 */
                $location.path('/search/1').replace();
                $location.search({
                    q : $scope.content
                });
            };
        }])


})(angular);
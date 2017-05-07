/**
 * Created by Joy-li on 2017/5/7.
 */
(function (angular) {

    'use strict';

    angular.module('moviecat.directives.cssLoading', [])
        .directive('cssLoading', [function () {
            return {
                restrict: 'EA',
                template: '<div class="mask" ng-if="showContent">' +
                            '<div class="loading">' +
                            '<span></span>' +
                            '<span></span>' +
                            '<span></span>' +
                            '<span></span>' +
                            '<span></span>' +
                            '</div>' +
                          '</div>',
                replace : true
            }

        }])


})(angular);
/**
 * Created by Joy-li on 2017/5/7.
 */
(function (angular) {

    'use strict';

    angular.module('moviecat.directives.cutPage', [])
        .directive('cutPage', [function () {
            return {
                restrict: 'EA',
                template: '<nav aria-label="...">' +
                    '<ul class="pager">' +
                    '<li><a href="javaScript:void(0)" ng-click="firstPage()">First</a></li>' +
                    '<li ng-class="{disabled : page == 1}"><a href="javaScript:void(0)" ng-click="goPage(page - 1)">Previous</a></li>' +
                    '<li ng-class="{disabled : page == totalPage}"><a href="javaScript:void(0)" ng-click="goPage(page + 1)">Next</a></li>' +
                    '<li><a href="javaScript:void(0)" ng-click="endPage()">End</a></li>' +
                    '</ul>' +
                    '</nav>',
                replace: true
            }

        }])


})(angular);
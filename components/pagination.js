/**
 * Created by Joy-li on 2017/5/7.
 */
(function (angular) {

    'use strict';

    angular.module('moviecat.directives.pagination', [])
        .directive('pagination', [function () {
            return {
                restrict: 'EA',
                template: '<nav aria-label="Page navigation">'+
                              '<ul class="pagination">'+
                                  '<li ng-click="goPage(page-1)" ng-class="{disabled:page==1}">'+
                                      '<a href="javaScript:void(0)" aria-label="Previous">'+
                                          '<span aria-hidden="true">&laquo;</span>'+
                                      '</a>'+
                                  '</li>'+
                                  '<li ng-class="{disabled:page==1}"><a href="javaScript:void(0)" ng-click="firstPage()">First</a></li>' +
                                  '<li ng-repeat="index in pageArr track by $index" ng-click="goPage(index)" ng-class="{active:index == page}"><a href="javaScript:void(0)">{{index}}</a></li>'+
                                  '<li ng-class="{disabled:page==totalPage}"><a href="javaScript:void(0)" ng-click="endPage()">End</a></li>' +
                                  '<li ng-click="goPage(page+1)" ng-class="{disabled:page==totalPage}">'+
                                      '<a href="javaScript:void(0)" aria-label="Next">'+
                                      '<span aria-hidden="true">&raquo;</span>'+
                                      '</a>'+
                                  '</li>'+
                              '</ul>'+
                          '</nav>',
                replace: true
            }

        }])


})(angular);
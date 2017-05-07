/**
 * Created by Joy-li on 2017/5/7.
 */
(function (angular) {

    'use strict';

    angular.module('moviecat.directives.autoFocus', [])
        /* 自定义指令不能注入$scope对象 -- 要在link函数或者controller函数中注入！ */
        .directive('autoFocus', ['$location',function ($location) {
            return {
                restrict : 'EA',
                /* angular所有的dom操作都在自定义指令的link函数中 */
                link : function ($scope,iEle,iAttrs) {
                    $scope.$location = $location;
                    $scope.$watch('$location.path()', function (now,old) {
                        var aLink = iEle.children().attr('href');
                        var type = aLink.replace(/#(\/.+)\/\d+/,'$1');
                        if(now.startsWith(type)) {
                            iEle.addClass('active');
                        }else {
                            iEle.removeClass('active');
                        }
                    });



                }
            }

        }])


})(angular);
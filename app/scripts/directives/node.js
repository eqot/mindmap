'use strict';

angular.module('mindmapApp')
  .directive('nodetree', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/nodetree.html',
      replace: true,
      scope: {
        nodetree: '='
      }
    };
  })

  .directive('nodeitem', function ($compile) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/nodeitem.html',
      replace: true,
      scope: {
        nodeitem: '='
      },
      link: function (scope, element) {
        if (angular.isArray(scope.nodeitem.children)) {
          element.append('<nodetree nodetree="nodeitem.children" />');
          $compile(element.contents())(scope);
        }
      }
    };
  });

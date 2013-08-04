'use strict';

angular.module('mindmapApp')
  .directive('treenode', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/treenode.html',
      replace: true,
      scope: {
        treenode: '=',
        collapsed: '='
      }
    };
  })

  .directive('node', function ($compile, $rootScope, TreeGlobal) {
    return {
      restrict: 'E',
      templateUrl: 'views/node.html',
      replace: true,
      scope: {
        node: '='
      },
      link: function (scope, element, attrs) {
        // console.log(scope);

        TreeGlobal.addNode(scope);

        scope.focused = false;
        scope.editing = false;

        scope.collapsed = false;

        scope.hasChildren = angular.isArray(scope.node.children);

        if (scope.hasChildren) {
          element.append('<treenode treenode="node.children" collapsed="collapsed" />');
          $compile(element.contents())(scope);
        }

        scope.focus = function (event) {
          event.stopPropagation();

          TreeGlobal.focus(scope);
          TreeGlobal.edit(null);
        };

        scope.edit = function (event) {
          event.stopPropagation();

          TreeGlobal.edit(scope);
          TreeGlobal.focus(null);
        };
      }
    };
  });

'use strict';

angular.module('mindmapApp')
  .directive('treenode', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/treenode.html',
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
      templateUrl: 'scripts/directives/node.html',
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
  })

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
      require: '^editable',
      link: function (scope, element, attrs, editableCtrl) {
        editableCtrl.addElement(element);

        element.scope = scope;

        scope.hasChildren = angular.isArray(scope.nodeitem.children);
        scope.collapsed = false;

        if (scope.hasChildren) {
          element.append('<nodetree nodetree="nodeitem.children" />');
          $compile(element.contents())(scope);
        }

        scope.editable = function () {
          return element.hasClass('edit');
        };

        scope.focus = function (event) {
          event.stopPropagation();

          editableCtrl.focus(element);
          editableCtrl.edit();
        };

        scope.edit = function (event) {
          event.stopPropagation();

          editableCtrl.focus();
          editableCtrl.edit(element);
        };

        scope.submit = function () {
          editableCtrl.edit();
        };
      }
    };
  });

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

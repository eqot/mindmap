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

  .directive('nodeitem', function ($compile, $rootScope) {
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

        scope.editable = function () {
          return element.hasClass('edit');
        };

        scope.focus = function (event) {
          event.stopPropagation();

          element.addClass('edit');

          var focusedElement = $rootScope.$$childHead.focusedElement;
          if (focusedElement) {
            focusedElement.removeClass('edit');
          }
          $rootScope.$$childHead.focusedElement = element;
        };
      }
    };
  });

/*global $ */

'use strict';

angular.module('mindmapApp')
  .controller('MainCtrl', function ($scope, $timeout) {
    $scope.nodes = [
      {
        label: 'test0',
        children: [
          {
            label: 'test0-0'
          },
          {
            label: 'test0-1',
            children: [
              {
                label: 'test0-1-0'
              },
              {
                label: 'test0-1-1'
              }
            ]
          }
        ]
      },
      {
        label: 'test1',
        children: []
      }
    ];

    $scope.focusedElement = null;

    $scope.$watch('focusedElement', function (newElement, oldElement) {
      var FOCUS_CLASS = 'focus';

      if (oldElement) {
        $(oldElement[0].children[0].children[0]).removeClass(FOCUS_CLASS);
      }

      if (newElement) {
        $(newElement[0].children[0].children[0]).addClass(FOCUS_CLASS);
      }
    });

    $scope.editingElement = null;

    $scope.$watch('editingElement', function (newElement, oldElement) {
      var EDIT_CLASS = 'edit';

      if (oldElement) {
        oldElement.removeClass(EDIT_CLASS);

        $timeout(function () {
          oldElement.find('input')[0].blur();
        }, 1);
      }

      if (newElement) {
        newElement.addClass(EDIT_CLASS);

        $timeout(function () {
          newElement.find('input')[0].focus();
        }, 1);
      }
    });

    $(document).keydown(function (event) {
      if (event.keyCode === 27) {
        $scope.editingElement = null;
        $scope.$apply();
      }
    });
  });

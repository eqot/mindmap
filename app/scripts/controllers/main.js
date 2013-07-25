'use strict';

angular.module('mindmapApp')
  .controller('MainCtrl', function ($scope) {
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

    var EDIT_CLASS = 'edit';
    $scope.focusedElement = null;
    $scope.focus = function (element) {
      if ($scope.focusedElement === element) {
        return;
      }

      if ($scope.focusedElement) {
        $scope.focusedElement.removeClass(EDIT_CLASS);
      }
      $scope.focusedElement = element || null;

      if (element) {
        element.addClass(EDIT_CLASS);
      }
    };
  });

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

    var EDIT_CLASS = 'edit';
    $scope.focusedElement = null;
    $scope.focus = function (element) {
      if ($scope.focusedElement === element) {
        return;
      }

      var focusedElement = $scope.focusedElement;
      if (focusedElement) {
        focusedElement.removeClass(EDIT_CLASS);

        $timeout(function () {
          $(focusedElement.find('input')[0]).blur();
        }, 1);
      }
      $scope.focusedElement = element || null;

      if (element) {
        element.addClass(EDIT_CLASS);

        $timeout(function () {
          $(element.find('input')[0]).focus();
        }, 1);
      }
    };

    $(document).keydown(function (event) {
      if (event.keyCode === 27) {
        $scope.focus();
      }
    });
  });

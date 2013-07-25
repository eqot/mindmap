'use strict';

angular.module('mindmapApp')
  .controller('MainCtrl', function ($scope) {
    $scope.nodes = [
      {
        label: 'test0',
        children: [
          {
            label: 'test0-1',
            children: []
          },
          {
            label: 'test0-2',
            children: []
          }
        ]
      },
      {
        label: 'test1',
        children: []
      }
    ];
  });

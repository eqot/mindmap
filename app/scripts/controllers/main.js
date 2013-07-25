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
  });

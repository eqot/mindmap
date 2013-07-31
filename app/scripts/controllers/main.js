'use strict';

angular.module('mindmapApp')
  .controller('MainCtrl', function ($scope, MindMap) {

    var id = 'mindmap_0';
    MindMap.get(id, function (mindmap) {
      $scope.mindmap = mindmap;
      // console.log($scope.mindmap);
    });

/*
    $scope.mindmap = {
      title: 'test',
      content: [
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
          children: [
            {
              label: 'test1-0'
            },
            {
              label: 'test1-1'
            }
          ]
        },
        {
          label: 'test2',
          children: []
        }
      ]
    };
*/
    // MindMap.save(id, $scope.mindmap, function (mindmap) {
    // });
  });

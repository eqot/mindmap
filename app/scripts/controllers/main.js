'use strict';

angular.module('mindmapApp')
  .controller('MainCtrl', function ($scope, MindMap) {

    $scope.saved = true;

    var id = 'mindmap_0';
    MindMap.get(id, function (mindmap) {
      $scope.mindmap = mindmap;
      // console.log($scope.mindmap);
    });

    var saveTimer = null;
    $scope.lazySave = function () {
      $scope.saved = false;

      cancelLazySave();

      saveTimer = setTimeout(function () {
        saveTimer = null;
        doSave();
      }, 3000);
    };

    function cancelLazySave () {
      if (saveTimer) {
        clearTimeout(saveTimer);
        saveTimer = null;
      }
    }

    function doSave () {
      MindMap.save(id, $scope.mindmap, function () {
        $scope.saved = true;
      });
    }

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
  });

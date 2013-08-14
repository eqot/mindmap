'use strict';

angular.module('mindmapApp')
  .controller('DetailCtrl', function ($scope, $rootScope, $routeParams, MindMap) {

    var id = $routeParams.id;

    $scope.mindmap = MindMap.get({id: id}, function () {
      $rootScope.title = ': ' + $scope.mindmap.title;
    });

    $rootScope.$on('save', function () {
      $scope.lazySave();
      $scope.$apply();
    });

    $scope.saved = true;

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
      $scope.mindmap.$update(function () {
        $scope.saved = true;
      });
    }

/*
    $scope.mindmap = {
      title: 'test',
      content: [
        {
          label: 'root',
          children: [
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
        }
      ]
    };

    doSave();
*/
  });

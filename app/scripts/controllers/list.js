'use strict';

angular.module('mindmapApp')
  .controller('ListCtrl', function ($scope, MindMap) {

    $scope.mindmaps = MindMap.query();

    $scope.createMindMap = function () {
      var mindmap = {
        title: 'No title',
        content: [{
          label: 'root',
          children: []
        }]
      };

      MindMap.save(mindmap, function (res) {
        mindmap._id = res._id;
        $scope.mindmaps.push(mindmap);
      });
    };

    $scope.toggleStar = function (index) {
      var mindmap = $scope.mindmaps[index];
      if (mindmap.star) {
        mindmap.star = false;
      } else {
        mindmap.star = true;
      }
    };
  });

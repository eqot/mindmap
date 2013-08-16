'use strict';

angular.module('mindmapApp')
  .controller('ListCtrl', function ($scope, $rootScope, MindMap) {

    $rootScope.title = '';

    $scope.mindmaps = MindMap.query();

    $scope.sorts = [
      {name: 'Alphabetical', value: 'title'},
      {name: 'Newest', value: 'age'},
      {name: 'Oldest', value: '-age'}
    ];
    $scope.orderProp = $scope.sorts[0].value;

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

    $scope.deleteMindMap = function () {
      for (var i = $scope.mindmaps.length - 1; i >= 0; i--) {
        var mindmap = $scope.mindmaps[i];
        if (mindmap.selected) {
          $scope.mindmaps.splice(i, 1);

          mindmap.$delete();
        }
      }
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

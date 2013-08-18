'use strict';

angular.module('mindmapApp')
  .controller('ListCtrl', function ($scope, $rootScope, MindMap, MindMap2) {

    $rootScope.title = '';

    // $scope.mindmaps = MindMap.query();

    MindMap2.query(function (data) {
      // console.log(data);
      $scope.mindmaps = data;
    });

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

      // MindMap.save(mindmap, function (res) {
      //   mindmap._id = res._id;
      //   $scope.mindmaps.push(mindmap);
      // });
      MindMap2.save(mindmap, function (res) {
        console.log(res);
        mindmap._id = res._id;
        $scope.mindmaps.push(mindmap);
      });
    };

    $scope.deleteMindMap = function () {
      for (var i = $scope.mindmaps.length - 1; i >= 0; i--) {
        var mindmap = $scope.mindmaps[i];
        if (mindmap.selected) {
          $scope.mindmaps.splice(i, 1);

          // mindmap.$delete();
          MindMap2.remove(mindmap._id);
        }
      }
    };

    $scope.toggleStar = function (mindmap) {
      if (mindmap.star) {
        mindmap.star = false;
      } else {
        mindmap.star = true;
      }
    };
  });

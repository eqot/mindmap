'use strict';

angular.module('mindmapApp')
  .controller('ListCtrl', function ($scope, $rootScope, MindMap) {

    $rootScope.title = '';

    MindMap.query(function (data) {
      $scope.mindmaps = data;
    });

    $scope.sorts = [
      {name: 'Alphabetical', value: 'title'},
      {name: 'Newest', value: '-date'},
      {name: 'Oldest', value: 'date'}
    ];
    $scope.orderProp = $scope.sorts[0].value;

    $scope.createMindMap = function () {
      var mindmap = {
        title: 'No title',
        content: [{
          label: 'root',
          children: []
        }],
        date: new Date()
      };

      MindMap.save(mindmap, function (res) {
        // console.log(res);
        mindmap._id = res._id;
        $scope.mindmaps.push(mindmap);
      });
    };

    $scope.deleteMindMap = function () {
      for (var i = $scope.mindmaps.length - 1; i >= 0; i--) {
        var mindmap = $scope.mindmaps[i];
        if (mindmap.selected) {
          $scope.mindmaps.splice(i, 1);

          MindMap.remove(mindmap._id);
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

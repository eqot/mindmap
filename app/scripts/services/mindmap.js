'use strict';

angular.module('mindmapApp')
  .factory('MindMap', function ($resource) {
    var DB_URL = '//192.168.33.10\\:3000/mindmaps/mindmaps/';
    return $resource(DB_URL + ':id', {id: '@_id'});
  });

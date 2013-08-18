'use strict';

angular.module('mindmapApp')
  .factory('MindMap2', function ($http) {

    var DB_URL = '//192.168.33.10:3000/mindmaps/mindmaps';

    function query(callback) {
      $http.get(DB_URL).success(function (res) {
        if (callback) {
          callback(res);
        }
      });
    }

    function get(id, callback) {
      console.log(id);
      // console.log($http);
      $http.get(DB_URL + '/' + id).success(function (res) {
        if (callback) {
          callback(res);
        }
      });
    }

    function save(data, callback) {
      $http.post(DB_URL, data).success(function (res) {
        if (callback) {
          callback(res);
        }
      });
    }

    function update(id, data, callback) {
      $http.put(DB_URL + '/' + id, data).success(function (res) {
        if (callback) {
          callback(res);
        }
      });
    }

    function remove(id) {
      $http.delete(DB_URL + '/' + id);
    }

    return {
      query: query,
      get: get,
      save: save,
      update: update,
      remove: remove
    };

  });


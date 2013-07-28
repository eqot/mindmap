/*global $ */

'use strict';

angular.module('mindmapApp')
  .directive('editable', function ($timeout) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<div ng-transclude></div>',
      controller: function () {
        var FOCUS_CLASS = 'focus';
        var EDIT_CLASS = 'edit';

        var focusedElement = null;
        var editingElement = null;

        this.focus = function (element) {
          var oldElement = focusedElement;
          focusedElement = element || null;

          if (oldElement) {
            $(oldElement[0].children[0].children[0]).removeClass(FOCUS_CLASS);
          }

          if (element) {
            $(element[0].children[0].children[0]).addClass(FOCUS_CLASS);
          }
        };

        this.edit = function (element) {
          var oldElement = editingElement;
          editingElement = element || null;

          if (oldElement) {
            oldElement.removeClass(EDIT_CLASS);

            $timeout(function () {
              oldElement.find('input')[0].blur();
            }, 1);
          }

          if (element) {
            element.addClass(EDIT_CLASS);

            $timeout(function () {
              element.find('input')[0].focus();
            }, 1);
          }
        };

        var that = this;
        $(document).keydown(function (event) {
          if (event.keyCode === 27) {
            that.edit();
          }
        });
      }
    };
  });

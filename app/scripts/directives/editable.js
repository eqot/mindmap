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
        var elements = [];

        var FOCUS_CLASS = 'focus';
        var EDIT_CLASS = 'edit';
        var COLLAPSE_CLASS = 'collapsed';

        var focusedElement = null;
        var editingElement = null;

        this.addElement = function (element) {
          elements.push(element);
        };

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

        function moveFocus(delta) {
          if (!focusedElement) {
            return;
          }

          var index = elements.indexOf(focusedElement);
          // console.log(index);
          index += delta;
          if (index < 0 || index >= elements.length) {
            return;
          }

          var element = elements[index];
          that.focus(element);
        }

        function collapse () {
          if (!focusedElement) {
            return;
          }

          focusedElement.addClass(COLLAPSE_CLASS);
        }

        function expand () {
          if (!focusedElement) {
            return;
          }

          focusedElement.removeClass(COLLAPSE_CLASS);
        }

        $(document).keydown(function (event) {
          // console.log(event.keyCode);
          switch (event.keyCode) {
          case 13: // Enter key
            if (focusedElement) {
              that.edit(focusedElement);
              that.focus(null);
            }
            break;

          case 27: // ESC key
            if (editingElement) {
              that.focus(editingElement);
              that.edit();
            }
            break;

          case 38: // Up key
            moveFocus(-1);
            break;

          case 40: // Down key
            moveFocus(+1);
            break;

          case 37: // Left key
            collapse();
            break;

          case 39: // Right key
            expand();
            break;

          default:
            break;
          }
        });
      }
    };
  });

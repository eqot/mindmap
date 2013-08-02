/*global $ */

'use strict';

angular.module('mindmapApp')
  .factory('TreeGlobal', function() {

    var nodes = [];

    var focusedNode = null;
    var editingNode = null;

    function addNode (node) {
      nodes.push(node);
    }

    function focus (node, forceToUpdate) {
      function update (node, flag) {
        if (node) {
          node.focused = flag;
          if (forceToUpdate) {
            node.$apply();
          }
        }
      }

      update(focusedNode, false);
      focusedNode = node;
      update(focusedNode, true);
    }

    function edit (node, forceToUpdate) {
      function update (node, flag) {
        if (node) {
          node.editing = flag;
          if (forceToUpdate) {
            node.$apply();
          }
        }
      }

      update(editingNode, false);
      editingNode = node;
      update(editingNode, true);
    }

    function moveFocus (delta) {
      if (!focusedNode) {
        return;
      }

      var index = nodes.indexOf(focusedNode);
      // console.log(index);
      index += delta;
      if (index < 0 || index >= nodes.length) {
        return;
      }

      var element = nodes[index];
      focus(element, true);
    }

    function collapse (delta) {
      if (!focusedNode) {
        return;
      }

      focusedNode.collapsed = delta;
      focusedNode.$apply();
    }

    $(document).keydown(function (event) {
      // console.log(event.keyCode);

      switch (event.keyCode) {
      case 13: // Enter key
        if (focusedNode) {
          // that.edit(focusedNode, true);
          edit(focusedNode, true);
          focus(null, true);
        }
        break;

      case 27: // ESC key
        if (editingNode) {
          focus(editingNode, true);
          edit(null, true);
        }
        break;

      case 38: // Up key
        moveFocus(-1);
        break;

      case 40: // Down key
        moveFocus(+1);
        break;

      case 37: // Left key
        collapse(true);
        break;

      case 39: // Right key
        collapse(false);
        break;

      default:
        break;
      }
    });

    return {
      addNode: addNode,
      focus: focus,
      edit: edit
    };
  });

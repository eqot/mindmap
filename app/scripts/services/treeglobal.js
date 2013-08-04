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

      var newNode = nodes[index];
      focus(newNode, true);
    }

    function focus (newNode, forceToUpdate) {
      var oldNode = focusedNode;
      focusedNode = newNode;

      update(oldNode, 'focused', false, forceToUpdate);
      update(newNode, 'focused', true, forceToUpdate);
    }

    function edit (newNode, forceToUpdate) {
      var oldNode = editingNode;
      editingNode = newNode;

      update(oldNode, 'editing', false, forceToUpdate);
      update(newNode, 'editing', true, forceToUpdate);
    }

    function collapse (collapsed) {
      update(focusedNode, 'collapsed', collapsed, true);
    }

    function update (node, state, flag, forceToUpdate) {
      if (node) {
        node[state] = flag;

        if (forceToUpdate) {
          node.$apply();
        }
      }
    }

    $(document).keydown(function (event) {
      // console.log(event.keyCode);

      switch (event.keyCode) {
      case 13: // Enter key
        if (focusedNode) {
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

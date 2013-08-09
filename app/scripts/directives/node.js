/*global $ */

'use strict';

angular.module('mindmapApp')
  .directive('treenode', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/treenode.html',
      replace: true,
      scope: {
        treenode: '=',
        collapsed: '='
      }
    };
  })

  .directive('node', function ($compile, $rootScope, TreeUi) {
    return {
      restrict: 'E',
      templateUrl: 'views/node.html',
      replace: true,
      scope: {
        node: '='
      },
      link: function (scope, element) {
        // console.log(scope);

        var TREE_NODE_HTML = '<treenode treenode="node.children" collapsed="collapsed" />';

        scope.element = element;

        scope.focused = false;
        scope.editing = false;

        scope.collapsed = false;

        TreeUi.addNode(scope);

        scope.lazySave = function () {
          // console.log('ok');
        };

        scope.cancelEvent = function (event) {
          if (event) {
            event.stopPropagation();
          }
        };

        scope.hasChildren = function () {
          return scope.node.children && angular.isArray(scope.node.children);
        };

        if (scope.hasChildren()) {
          element.append(TREE_NODE_HTML);
          $compile(element.contents())(scope);

          for (var i = 0; i < scope.node.children.length; i++) {
            scope.node.children[i].parent = scope;
          }
        }

        scope.focus = function (event) {
          if (event) {
            event.stopPropagation();
          }

          TreeUi.focus(scope);
          TreeUi.edit(null);
        };

        scope.edit = function (event) {
          if (event) {
            event.stopPropagation();
          }

          TreeUi.edit(scope);
          TreeUi.focus(null);
        };

        scope.getParent = function () {
          return scope.node.parent;
        };

        scope.getChildren = function () {
          return scope.node.children;
        };

        scope.addChild = function () {
          if (!scope.node.children) {
            scope.node.children = [];

            scope.element.append(TREE_NODE_HTML);
            $compile(scope.element.contents())(scope);
          }

          scope.node.children.push({
            label: 'test',
            children: [],
            parent: scope
          });

          scope.$apply();
        };

        scope.removeChild = function (node) {
          var index = scope.node.children.indexOf(node);
          if (index !== -1) {
            scope.node.children.splice(index, 1);
          }
        };

        scope.remove = function () {
          var parent = scope.getParent();
          if (parent) {
            parent.removeChild(scope.node);
            parent.$apply();

            TreeUi.removeNode(scope);

            return true;
          }

          return false;
        };
      }
    };
  })

  .factory('TreeUi', function($timeout, $filter) {
    var nodes = [];

    var focusedNode = null;
    var editingNode = null;

    function addNode (node) {
      nodes.push(node);

      sortNodes();
    }

    function removeNode (node) {
      var index = nodes.indexOf(node);
      if (index !== -1) {
        nodes.splice(index, 1);

        sortNodes();
      }
    }

    function sortNodes () {
      var sorter = $filter('orderBy');
      var sortedNodes = sorter(nodes, 'element.0.offsetTop');
      // console.log(sortedNodes);

      nodes = sortedNodes;
    }

    function moveFocus (delta) {
      if (!focusedNode) {
        focus(nodes[0], true);

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

      var contentRect = $('#content')[0].getClientRects()[0];

      var element = newNode.element.find('span')[0];
      var elementRect = element.getClientRects()[0];
      if (delta < 0) {
        if (elementRect.top < contentRect.top) {
          element.scrollIntoView(true);
        }
      } else {
        if (elementRect.bottom > contentRect.bottom) {
          element.scrollIntoView(false);
        }
      }
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

      $timeout(function () {
        if (oldNode) {
          oldNode.element.find('input').blur();
        }

        if (newNode) {
          newNode.element.find('input').focus();
        }
      }, 1);
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
        if (editingNode) {
          focus(editingNode, true);
          edit(null, true);
        } else if (focusedNode) {
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
        event.preventDefault();
        moveFocus(-1);
        break;

      case 40: // Down key
        event.preventDefault();
        moveFocus(+1);
        break;

      case 37: // Left key
        collapse(true);
        break;

      case 39: // Right key
        collapse(false);
        break;

      case 107: // + key
        if (focusedNode) {
          var node = event.shiftKey ? focusedNode.getParent() : focusedNode;
          if (node) {
            node.addChild();
          }
        }
        break;

      case 46:  // Del key
      case 109: // - key
        if (focusedNode) {
          var result = focusedNode.remove();
          if (result) {
            focusedNode = null;
          }
        }
        break;

      default:
        break;
      }
    });

    $(document).click(function () {
      if (editingNode) {
        focus(editingNode, true);
        edit(null, true);
      }
    });

    function resize () {
      var content = $('#content');
      var contentRect = content[0].getClientRects()[0];
      content.height(window.innerHeight - contentRect.top - 15);
    }
    resize();
    window.onresize = resize;

    return {
      addNode: addNode,
      removeNode: removeNode,
      focus: focus,
      edit: edit
    };
  });

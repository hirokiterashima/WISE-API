'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavItemController = function () {
    function NavItemController($scope, $element, ProjectService, StudentDataService) {
        _classCallCheck(this, NavItemController);

        this.$scope = $scope;
        this.$element = $element;
        this.ProjectService = ProjectService;
        this.StudentDataService = StudentDataService;

        this.expanded = false;

        this.item = this.ProjectService.idToNode[this.nodeId];
        this.isGroup = this.ProjectService.isGroupNode(this.nodeId);
        this.nodeStatuses = this.StudentDataService.nodeStatuses;
        this.nodeStatus = this.nodeStatuses[this.nodeId];

        this.nodeTitle = this.showPosition ? this.ProjectService.idToPosition[this.nodeId] + ': ' + this.item.title : this.item.title;
        this.currentNode = this.StudentDataService.currentNode;
        var isCurrentNode = this.currentNode.id === this.nodeId;
        var setNewNode = false;

        var scope = this;

        this.$scope.$watch(function () {
            return this.StudentDataService.currentNode;
        }.bind(this), function (newNode) {
            scope.currentNode = newNode;
            if (this.StudentDataService.previousStep) {
                this.$scope.$parent.isPrevStep = scope.nodeId === this.StudentDataService.previousStep.id;
            }
            isCurrentNode = scope.currentNode.id === scope.nodeId;
            if (isCurrentNode || this.ProjectService.isApplicationNode(newNode.id) || newNode.id === this.ProjectService.rootNode.id) {
                this.setExpanded();
            }
        }.bind(this));

        this.$scope.$watch(function () {
            return scope.expanded;
        }.bind(this), function (value) {
            this.$scope.$parent.itemExpanded = value;
            if (value) {
                this.zoomToElement();
            }
        }.bind(this));

        this.setExpanded();
    }

    _createClass(NavItemController, [{
        key: 'getTemplateUrl',
        value: function getTemplateUrl() {
            return this.ProjectService.getThemePath() + '/navigation/navItem.html';
        }
    }, {
        key: 'setExpanded',
        value: function setExpanded() {
            this.$scope.expanded = this.isCurrentNode || this.$scope.isGroup && this.ProjectService.isNodeDescendentOfGroup(this.$scope.currentNode, this.$scope.item);
            if (this.$scope.expanded && this.isCurrentNode) {
                this.zoomToElement();
            }
        }
    }, {
        key: 'zoomToElement',
        value: function zoomToElement() {
            setTimeout(function () {
                // smooth scroll to expanded group's page location
                var location = this.$element[0].offsetTop - 32;
                $('#content').animate({
                    scrollTop: location
                }, 350, 'linear', function () {
                    if (setNewNode) {
                        setNewNode = false;
                        this.StudentDataService.endCurrentNodeAndSetCurrentNodeByNodeId(scope.nodeId);
                    }
                });
            }, 250);
        }
    }, {
        key: 'itemClicked',
        value: function itemClicked() {
            if (this.isGroup) {
                if (!this.expanded) {
                    setNewNode = true;
                }
                this.expanded = !this.expanded;
            } else {
                this.StudentDataService.endCurrentNodeAndSetCurrentNodeByNodeId(this.nodeId);
            }
        }
    }]);

    return NavItemController;
}();

NavItemController.$inject = ['$scope', '$element', 'ProjectService', 'StudentDataService'];

exports.default = NavItemController;
var defaultEventManager = require("montage/core/event/event-manager").defaultEventManager,
    Montage = require("montage").Montage,

    COMPONENT_ACTION_TO_EVENT_TYPE = {
        COMPONENT_ENTER: "hover",
        _TOUCH_DOWN: "action"
    };

exports.ActionDispatcher = Montage.specialize({

    constructor: {
        value: function () {
            this.super();
        }
    },

    _scene: {
        value: null
    },

    initWithScene: {
        value: function (scene) {
            this._scene = scene;
            return this;
        }
    },

    /**
     * Returns the "hierarchical 3D tree" from a glTFElement.
     * @function
     * @private
     * @param {Object} glTFElement - a glTFElement => (leaf level).
     * @param {Array} [path] - the container of glTFElement parents.
     * @return {Array} an array of glTFElement parents to the glTFElement child.
     */
    _findPathToParentsForGlTFElement: {
        value: function (glTFElement, path) {
            if (!Array.isArray(path)) {
                path = [glTFElement];
            }

            if (glTFElement && glTFElement.parent) {
                var parent = glTFElement.parent;
                path.push(parent);

                return this._findPathToParentsForGlTFElement(parent, path);
            }

            return path;
        }
    },

    /**
     * Tries to find whether a listener has been registered for an eventType on a Component3D.
     * @function
     * @private
     * @param {String} action - a "Component Action".
     * @param {Object} component - a component which could be a target.
     * @return {Boolean}
     */
    _isRegisteredListenersForEventTypeOnComponent: {
        value: function (action, component) {
            var eventType = COMPONENT_ACTION_TO_EVENT_TYPE[action];

            if (defaultEventManager && eventType && component.uuid) {
                var registeredListenersForAction = defaultEventManager.registeredEventListeners[eventType];

                if (registeredListenersForAction) {
                    return !!registeredListenersForAction[component.uuid];
                }
            }

            return false;
        }
    },

    /**
     * Tries to find whether a Component3D has a css selector for an eventType.
     * @private
     * @param {String} action - a "Component Action".
     * @param {Object} component - a component which could be a target.
     * @return {Boolean}
     */
    _isComponentStyleRespondToAction: {
        value: function (action, component) {
            var eventType = COMPONENT_ACTION_TO_EVENT_TYPE[action],
                style = component._style;

            return eventType && eventType !== COMPONENT_ACTION_TO_EVENT_TYPE._TOUCH_DOWN &&
                style && typeof style === "object" && style.hasOwnProperty(eventType);
        }
    },

    /**
     * Dispatches an action through the "3D Components tree",
     * until it founds a Component 3D that is listening to this action.
     * @function
     * @public
     * @param {String} action - a "Component Action".
     * @param {Object} glTFElement - a glTFElement that has raised an action.
     */
    dispatchActionOnGlTFElement: {
        value: function(action, glTFElement) {
            if (typeof action === "string" && glTFElement && typeof glTFElement === "object") {
                var pathToParents = this._findPathToParentsForGlTFElement(glTFElement),
                    self = this;

                pathToParents.some(function (element) {
                    var component = element.component3D;

                    if (component && (self._isRegisteredListenersForEventTypeOnComponent(action, component) ||
                        self._isComponentStyleRespondToAction(action, component))) {

                        component.handleActionOnGlTFElement(glTFElement, action);

                        return true;
                    }

                    return false;
                });
            }
        }
    }

});

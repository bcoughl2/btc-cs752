montageDefine("7fd8be3","ui/base/abstract-confirm",{dependencies:["./abstract-alert","../../core/promise"],factory:function(require,exports,module){/**
 * @module ui/alert.reel
 */
var AbstractAlert = require("./abstract-alert").AbstractAlert,
    Promise = require("../../core/promise").Promise;

/**
 * @class Alert
 * @extends Component
 */
var AbstractConfirm = exports.AbstractConfirm = AbstractAlert.specialize(/** @lends AbstractAlert# */ {

    constructor: {
        value: function AbstractConfirm() {
            if (this.constructor === AbstractConfirm) {
                throw new Error("AbstractConfirm cannot be instantiated.");
            }
        }
    },

    cancelButton: {
        value: null
    },

    title: {
        value: "Confirm"
    },

    okLabel: {
        value: "OK"
    },

    cancelLabel: {
        value: "Cancel"
    },

    enterDocument: {
        value: function(firstTime) {
            this.super(firstTime);

            if (firstTime) {
                this._cancelButton.addEventListener("action", this, false);
            }
        }
    },

    handleAction: {
        value: function(event) {
            if (event.target === this._okButton) {
                this._userActionDeferred.resolve(AbstractConfirm.OKButton);
                this._userActionDeferred = null;
                this._overlay.hide();
            }

            if (event.target === this._cancelButton) {
                this._userActionDeferred.resolve(AbstractConfirm.CancelButton);
                this._userActionDeferred = null;
                this._overlay.hide();
            }
        }
    }

}, {

    show: {
        value: function(message, title, okLabel, cancelLabel) {
            var instance,
                self = this;

            if (!this.hasOwnProperty("_instance")) {
                this._setupInstance();
            }

            instance = this._instance;

            return this._nextMessagePromise = this._nextMessagePromise.then(function() {
                if (title) {
                    instance.title = title;
                } else {
                    instance.title = self.prototype.title;
                }
                instance.message = message;
                if (okLabel) {
                    instance.okLabel = okLabel;
                } else {
                    instance.okLabel = self.prototype.okLabel;
                }
                if (cancelLabel) {
                    instance.cancelLabel = cancelLabel;
                } else {
                    instance.cancelLabel = self.prototype.cancelLabel;
                }

                return instance.show();
            });
        }
    },

    OKButton: {
        value: "ok"
    },

    CancelButton: {
        value: "cancel"
    }

});


}})
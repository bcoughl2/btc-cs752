montageDefine("7fd8be3","core/extras/date",{dependencies:[],factory:function(require,exports,module){/**
*  Defines extensions to intrinsic `Date` object.
*  @module montage/core/extras/date
*  @see {external:Date}
*/

/**
 * @external
 */

/**
 *  Creates a copy of a date.
 *
 *  @method external:Date#clone
 *  @returns {Date} a new date
*/
Object.defineProperty(Date.prototype, "clone", {
    value: function () {
        return new Date(this);
    },
    writable: true,
    configurable: true
});


}})
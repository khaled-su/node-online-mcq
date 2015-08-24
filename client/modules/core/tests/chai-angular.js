/* global define: true, chai: true */

(function (chaiModule) {
    'use strict';

    if (typeof require === 'function' && typeof exports === 'object' &&
        typeof module === 'object') {
        // Node.js.
        module.exports = chaiModule;
    } else if (typeof define === 'function' && define.amd) {
        // AMD.
        define(function () { return chaiModule; });
    } else {
        // Other.
        if (!chai) {
            throw new Error('Chai cannot be found in current scope.');
        }
        chai.use(chaiModule);
    }
})(function(chai, _) {
    'use strict';

    chai.Assertion.addMethod('angularEql', function (expected) {
        /* jshint validthis: true */
        var obj = this._obj;
        
        this.assert(
            angular.equals(obj, expected),
            'expected #{this} to angular equal #{exp}, but was #{act}',
            'expected #{this} to not angular equal #{exp}, but was #{act}',
            expected,
            obj
        );
    });
});

"use strict";
exports.__esModule = true;
exports.UnSerialize = void 0;
var AutoItFunctions_1 = require("../AutoIt/AutoItFunctions");
var AutoItTypes_1 = require("../AutoIt/AutoItTypes");
var UnSerialize = (function () {
    function UnSerialize() {
    }
    UnSerialize.prototype.unSerialize = function (source) {
        var part = source.split('|');
        var val = part[1];
        switch (part[0]) {
            case AutoItTypes_1.AutoItTypes.Binary:
            case AutoItTypes_1.AutoItTypes.String:
                return this.unSerializeString(val);
            case AutoItTypes_1.AutoItTypes.Array:
                return this.unSerializeArray(val);
            case AutoItTypes_1.AutoItTypes.Object:
                if (source === AutoItTypes_1.AutoItTypes.SpecialEmptyObject) {
                    return {};
                }
                return this.unSerializeScriptingObject(val);
            case AutoItTypes_1.AutoItTypes.Boolean:
                return this.unSerializeBoolean(val);
            case AutoItTypes_1.AutoItTypes.Ptr:
            case AutoItTypes_1.AutoItTypes.Int32:
            case AutoItTypes_1.AutoItTypes.Int64:
                return this.unSerializeInt(val);
            case AutoItTypes_1.AutoItTypes.Double:
                return this.unSerializeFloat(val);
            case AutoItTypes_1.AutoItTypes.Keyword:
                return null;
        }
    };
    UnSerialize.prototype.unSerializeString = function (string) {
        return AutoItFunctions_1["default"].binaryToString(string);
    };
    UnSerialize.prototype.unSerializeInt = function (int) {
        return parseInt(int);
    };
    UnSerialize.prototype.unSerializeFloat = function (float) {
        return parseFloat(float);
    };
    UnSerialize.prototype.unSerializeBoolean = function (bool) {
        return bool === '1';
    };
    UnSerialize.prototype.unSerializeScriptingObject = function (val) {
        var _this = this;
        var oObj = {};
        var payload = this.unSerializeString(val);
        var parts = payload.split('$');
        parts.forEach(function (part) {
            var subPart = part.split(':');
            var key = subPart[0];
            var val = subPart[1];
            oObj[key] = _this.unSerialize(val);
        });
        return oObj;
    };
    UnSerialize.prototype.unSerializeArray = function (val) {
        var _this = this;
        var payload = this.unSerializeString(val);
        var parts = payload.split('$');
        var aNew = [];
        parts.forEach(function (part) {
            aNew.push(_this.unSerialize(part));
        });
        return aNew;
    };
    return UnSerialize;
}());
exports.UnSerialize = UnSerialize;

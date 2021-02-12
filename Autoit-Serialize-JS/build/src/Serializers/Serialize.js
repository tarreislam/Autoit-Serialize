"use strict";
exports.__esModule = true;
exports.Serialize = void 0;
var AutoItFunctions_1 = require("../AutoIt/AutoItFunctions");
var AutoItTypes_1 = require("../AutoIt/AutoItTypes");
var AutoitSerializeTypeFactory_1 = require("../Other/AutoitSerializeTypeFactory");
var Serialize = (function () {
    function Serialize() {
    }
    Serialize.prototype.serialize = function (source) {
        return this.serializeValue(source).slice(0, -1);
    };
    Serialize.prototype.serializeValue = function (source, glue) {
        if (glue === void 0) { glue = '#'; }
        var type = typeof source;
        var AsTf = new AutoitSerializeTypeFactory_1["default"](glue);
        if (Array.isArray(source)) {
            return AsTf.make(AutoItTypes_1.AutoItTypes.Array, this.serializeArray(source));
        }
        else if (source === null) {
            return AsTf.make(AutoItTypes_1.AutoItTypes.Keyword, null);
        }
        else if (type === "number" && source % 1 !== 0) {
            return AsTf.make(AutoItTypes_1.AutoItTypes.Double, source);
        }
        else {
            switch (type) {
                case "object":
                    return AsTf.make(AutoItTypes_1.AutoItTypes.Object, this.serializeScriptingDictionary(source));
                case "string":
                    return AsTf.make(AutoItTypes_1.AutoItTypes.String, this.serializeString(source));
                case 'boolean':
                    return AsTf.make(AutoItTypes_1.AutoItTypes.Boolean, this.serializeBoolean(source));
                case 'number':
                    return AsTf.make(AutoItTypes_1.AutoItTypes.Int32, source);
            }
        }
    };
    Serialize.prototype.serializeString = function (string) {
        return AutoItFunctions_1["default"].stringToBinary(string);
    };
    Serialize.prototype.serializeBoolean = function (boolean) {
        return boolean ? '1' : '0';
    };
    Serialize.prototype.serializeScriptingDictionary = function (object) {
        var _this = this;
        var keys = Object.keys(object);
        var parts = [];
        keys.forEach(function (key) {
            var value = object[key];
            var serializedValue = _this.serializeValue(value, '');
            var part = key + ':' + serializedValue;
            parts.push(part);
        });
        return this.serializeString(parts.join('$'));
    };
    Serialize.prototype.serializeArray = function (array) {
        var _this = this;
        if (array.length === 0) {
            array.push(0);
        }
        var parts = [];
        array.forEach(function (item) {
            parts.push(_this.serializeValue(item, ''));
        });
        return this.serializeString(parts.join('$'));
    };
    return Serialize;
}());
exports.Serialize = Serialize;

"use strict";
exports.__esModule = true;
var AutoitSerializeTypeFactory = (function () {
    function AutoitSerializeTypeFactory(glue) {
        this.glue = glue;
    }
    AutoitSerializeTypeFactory.prototype.make = function (type, source) {
        if (source === null) {
            return type + '|' + this.glue;
        }
        return type + '|' + source + this.glue;
    };
    return AutoitSerializeTypeFactory;
}());
exports["default"] = AutoitSerializeTypeFactory;

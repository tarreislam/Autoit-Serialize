"use strict";
exports.__esModule = true;
var iconv_lite_1 = require("iconv-lite");
var AutoItFunctions = (function () {
    function AutoItFunctions() {
    }
    AutoItFunctions.binaryToString = function (str) {
        if (typeof str !== 'string') {
            str = str.toString();
        }
        if (str.length === 0) {
            return "";
        }
        var buffer = Buffer.from(str.substring(2), 'hex');
        return iconv_lite_1.decode(buffer, 'win1252').toString();
    };
    AutoItFunctions.stringToBinary = function (str) {
        if (str.length === 0) {
            return "";
        }
        return '0x' + iconv_lite_1.encode(str, 'win1252').toString('hex').toUpperCase();
    };
    return AutoItFunctions;
}());
exports["default"] = AutoItFunctions;

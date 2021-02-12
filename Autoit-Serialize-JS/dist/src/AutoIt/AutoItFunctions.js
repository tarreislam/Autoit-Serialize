"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iconv_lite_1 = require("iconv-lite");
class AutoItFunctions {
    static binaryToString(str) {
        if (typeof str !== 'string') {
            str = str.toString();
        }
        if (str.length === 0) {
            return "";
        }
        const buffer = Buffer.from(str.substring(2), 'hex');
        return iconv_lite_1.decode(buffer, 'win1252').toString();
    }
    static stringToBinary(str) {
        if (str.length === 0) {
            return "";
        }
        return '0x' + iconv_lite_1.encode(str, 'win1252').toString('hex').toUpperCase();
    }
}
exports.default = AutoItFunctions;
//# sourceMappingURL=AutoItFunctions.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnSerialize = void 0;
const AutoItFunctions_1 = require("../AutoIt/AutoItFunctions");
const AutoItTypes_1 = require("../AutoIt/AutoItTypes");
class UnSerialize {
    unSerialize(source) {
        const part = source.split('|');
        const val = part[1];
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
            default:
                return null;
        }
    }
    unSerializeString(string) {
        return AutoItFunctions_1.default.binaryToString(string);
    }
    unSerializeInt(int) {
        return parseInt(int);
    }
    unSerializeFloat(float) {
        return parseFloat(float);
    }
    unSerializeBoolean(bool) {
        return bool === '1';
    }
    unSerializeScriptingObject(val) {
        const oObj = {};
        const payload = this.unSerializeString(val);
        const parts = payload.split('$');
        parts.forEach((part) => {
            const subPart = part.split(':');
            const key = subPart[0];
            const val = subPart[1];
            oObj[key] = this.unSerialize(val);
        });
        return oObj;
    }
    unSerializeArray(val) {
        const payload = this.unSerializeString(val);
        const parts = payload.split('$');
        const aNew = [];
        parts.forEach((part) => {
            aNew.push(this.unSerialize(part));
        });
        return aNew;
    }
}
exports.UnSerialize = UnSerialize;
//# sourceMappingURL=UnSerialize.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serialize = void 0;
const AutoItFunctions_1 = require("../AutoIt/AutoItFunctions");
const AutoItTypes_1 = require("../AutoIt/AutoItTypes");
const AutoitSerializeTypeFactory_1 = require("../Other/AutoitSerializeTypeFactory");
class Serialize {
    serialize(source) {
        return this.serializeValue(source).slice(0, -1);
    }
    serializeValue(source, glue = '#') {
        const type = typeof source;
        const AsTf = new AutoitSerializeTypeFactory_1.default(glue);
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
        return '';
    }
    serializeString(string) {
        return AutoItFunctions_1.default.stringToBinary(string);
    }
    serializeBoolean(boolean) {
        return boolean ? '1' : '0';
    }
    serializeScriptingDictionary(object) {
        const keys = Object.keys(object);
        const parts = [];
        keys.forEach((key) => {
            const value = object[key];
            const serializedValue = this.serializeValue(value, '');
            const part = key + ':' + serializedValue;
            parts.push(part);
        });
        return this.serializeString(parts.join('$'));
    }
    serializeArray(array) {
        if (array.length === 0) {
            array.push(0);
        }
        const parts = [];
        array.forEach((item) => {
            parts.push(this.serializeValue(item, ''));
        });
        return this.serializeString(parts.join('$'));
    }
}
exports.Serialize = Serialize;
//# sourceMappingURL=Serialize.js.map
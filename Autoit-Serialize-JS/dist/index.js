"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Serialize_1 = require("./src/Serializers/Serialize");
const UnSerialize_1 = require("./src/Serializers/UnSerialize");
class default_1 {
    static serialize(source) {
        return (new Serialize_1.Serialize).serialize(source);
    }
    static unSerialize(source) {
        return (new UnSerialize_1.UnSerialize).unSerialize(source);
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map
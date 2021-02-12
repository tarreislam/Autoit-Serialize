"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AutoitSerializeTypeFactory {
    constructor(glue) {
        this.glue = glue;
    }
    make(type, source) {
        if (source === null) {
            return type + '|' + this.glue;
        }
        return type + '|' + source + this.glue;
    }
}
exports.default = AutoitSerializeTypeFactory;
//# sourceMappingURL=AutoitSerializeTypeFactory.js.map
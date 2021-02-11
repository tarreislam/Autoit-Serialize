import {AutoItTypes} from "./AutoItTypes";

export default class AutoitSerializeTypeFactory {

    static make(type: AutoItTypes, source: any, glue: string): string {
        if (typeof source === null) {
            return type + '|' + glue
        }
        return type + '|' + source + glue
    }

}
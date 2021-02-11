import {AutoItTypes} from "./AutoIt/AutoItTypes";

export default class AutoitSerializeTypeFactory {

    protected glue: string

    constructor(glue: string) {
        this.glue = glue
    }

    make(type: AutoItTypes, source: any): string {
        if (typeof source === null) {
            return type + '|' + this.glue
        }
        return type + '|' + source + this.glue
    }

}
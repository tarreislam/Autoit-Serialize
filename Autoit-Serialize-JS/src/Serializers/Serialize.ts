import AutoItFunctions from "../AutoIt/AutoItFunctions";
import {AutoItTypes} from "../AutoIt/AutoItTypes";
import AutoitSerializeTypeFactory from "../Other/AutoitSerializeTypeFactory";

export class Serialize {

    public serialize(source: any): string {
        return this.serializeValue(source).slice(0, -1)
    }

    protected serializeValue(source: any, glue: string = '#'): string {
        const type = typeof source
        const AsTf = new AutoitSerializeTypeFactory(glue)

        if (Array.isArray(source)) {
            return AsTf.make(AutoItTypes.Array, this.serializeArray(source))
        } else if (source === null) {
            return AsTf.make(AutoItTypes.Keyword, null)
        } else if (type === "number" && source % 1 !== 0) {
            return AsTf.make(AutoItTypes.Double, source)
        } else {
            switch (type) {
                case "object":
                    return AsTf.make(AutoItTypes.Object, this.serializeScriptingDictionary(source))
                case "string":
                    return AsTf.make(AutoItTypes.String, this.serializeString(source))
                case 'boolean':
                    return AsTf.make(AutoItTypes.Boolean, this.serializeBoolean(source))
                case 'number':
                    return AsTf.make(AutoItTypes.Int32, source)
            }
        }
    }

    protected serializeString(string: string): string {
        return AutoItFunctions.stringToBinary(string)
    }

    protected serializeBoolean(boolean: boolean): string {
        return boolean ? '1' : '0'
    }

    protected serializeScriptingDictionary(object: object): string {
        const keys: Array<string> = Object.keys(object)
        const parts: Array<any> = []

        keys.forEach((key) => {
            const value: any = object[key]
            const serializedValue = this.serializeValue(value, '')
            const part = key + ':' + serializedValue
            parts.push(part)
        })

        return this.serializeString(parts.join('$'))
    }

    protected serializeArray(array: Array<any>): string {
        // AutoIt cannot handle empty arrays. Add 0
        if(array.length === 0){
            array.push(0)
        }

        const parts: Array<any> = []

        array.forEach((item) => {
            parts.push(this.serializeValue(item, ''))
        })

        return this.serializeString(parts.join('$'))
    }
}

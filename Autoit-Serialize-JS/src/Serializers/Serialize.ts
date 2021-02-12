import AutoItFunctions from "../AutoIt/AutoItFunctions";
import {AutoItTypes} from "../AutoIt/AutoItTypes";
import AutoitSerializeTypeFactory from "../Other/AutoitSerializeTypeFactory";

export class Serialize {

    public serialize(source: any): string {
        return this.serializeSerialize(source).slice(0, -1)
    }

    protected serializeSerialize(source: any, glue: string = '#'): string {
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
                    return AsTf.make(AutoItTypes.Boolean, (source ? 1 : 0))
                case 'number':
                    return AsTf.make(AutoItTypes.Int32, source)
            }
        }
    }

    protected serializeString(string: string): string {
        return AutoItFunctions.stringToBinary(string)
    }

    protected serializeScriptingDictionary(object: object): string {
        const keys: Array<string> = Object.keys(object)
        const parts: Array<any> = []

        keys.forEach((key) => {
            const value: any = object[key]
            parts.push(this.serializeSerialize(value, ''))
        })

        return this.serializeString(parts.join('$'))
    }

    protected serializeArray(array: Array<any>): string {
        const parts: Array<any> = []

        array.forEach((item) => {
            parts.push(this.serializeSerialize(item, ''))
        })

        return this.serializeString(parts.join('$'))
    }
}

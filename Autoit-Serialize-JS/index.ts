import AutoItFunctions from "./src/AutoIt/AutoItFunctions";
import {AutoItTypes} from "./src/AutoIt/AutoItTypes";
import AutoitSerializeTypeFactory from "./src/AutoitSerializeTypeFactory";
import {UnSerializedValue} from "./src/UnSerializedValue";

export class AutoitSerializeJS {

    public serialize(source: any): string {
        return this.serializeSerialize(source).slice(0, -1)
    }

    public unSerialize(source: any): UnSerializedValue {
        const part = source.split('|')
        const val = part[1]

        switch (part[0]) { // type
            case AutoItTypes.Ptr:
            case AutoItTypes.Binary:
            case AutoItTypes.String:
                return AutoItFunctions.binaryToString(val)
            case AutoItTypes.Array:
                return this.unSerializeArray(val)
            case AutoItTypes.Object:
                return this.unSerializeScriptingObject(val)
            case AutoItTypes.Boolean:
                return val === '1'
            case AutoItTypes.Int32:
            case AutoItTypes.Int64:
                return parseInt(val)
            case AutoItTypes.Double:
                return parseFloat(val)
            case AutoItTypes.Keyword:
                return null
        }
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
                    return AsTf.make(AutoItTypes.String, AutoItFunctions.stringToBinary(source))
                case 'boolean':
                    return AsTf.make(AutoItTypes.Boolean, (source ? 1 : 0))
                case 'number':
                    return AsTf.make(AutoItTypes.Int32, source)
            }
        }
    }

    protected serializeArray(array: Array<any>): string {
        const parts: Array<any> = []

        array.forEach((item) => {
            parts.push(this.serializeSerialize(item, ''))
        })

        return AutoItFunctions.stringToBinary(parts.join('$'))
    }

    protected serializeScriptingDictionary(object: object): string {
        const keys: Array<string> = Object.keys(object)
        const parts: Array<any> = []

        keys.forEach((key) => {
            const value: any = object[key]
            parts.push(this.serializeSerialize(value, ''))
        })

        return AutoItFunctions.stringToBinary(parts.join('$'))
    }

    // Here comes the unserialize part
    // Here comes the unserialize part
    // Here comes the unserialize part
    // Here comes the unserialize part
    // Here comes the unserialize part
    // Here comes the unserialize part
    // Here comes the unserialize part

    protected unSerializeArray(val: string): Array<any> {

        const payload: string = AutoItFunctions.binaryToString(val)
        const parts: Array<string> = payload.split('$')

        const aNew: Array<UnSerializedValue> = []

        parts.forEach((part) => {
            aNew.push(this.unSerialize(part))
        })

        return aNew
    }

    protected unSerializeScriptingObject(val: string) {
        const oObj: object = {}
        const payload: string = AutoItFunctions.binaryToString(val)

        if (!payload) {
            return oObj
        }

        const parts: Array<string> = payload.split('$')

        parts.forEach((part) => {
            const subPart = part.split(':')
            const key = subPart[0]
            const val = subPart[1]

            oObj[key] = this.unSerialize(val)
        })

        return oObj
    }
}

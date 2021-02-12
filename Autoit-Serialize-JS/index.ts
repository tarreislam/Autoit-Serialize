import AutoItFunctions from "./src/AutoIt/AutoItFunctions";
import {AutoItTypes} from "./src/AutoIt/AutoItTypes";
import AutoitSerializeTypeFactory from "./src/Other/AutoitSerializeTypeFactory";
import {UnSerializedValue} from "./src/Types/UnSerializedValue";

export class AutoitSerializeJS {

    public serialize(source: any): string {
        return this.serializeSerialize(source).slice(0, -1)
    }

    public unSerialize(source: any): UnSerializedValue {
        const part: Array<any> = source.split('|')
        const val: string = part[1]

        switch (part[0]) { // type
            case AutoItTypes.Ptr:
            case AutoItTypes.Binary:
            case AutoItTypes.String:
                return this.unSerializeString(val)
            case AutoItTypes.Array:
                return this.unSerializeArray(val)
            case AutoItTypes.Object:
                return this.unSerializeScriptingObject(val)
            case AutoItTypes.Boolean:
                return this.unSerializeBoolean(val)
            case AutoItTypes.Int32:
            case AutoItTypes.Int64:
                return this.unSerializeInt(val)
            case AutoItTypes.Double:
                return this.unSerializeFloat(val)
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

    // Here comes the unserialize part
    // Here comes the unserialize part
    // Here comes the unserialize part
    // Here comes the unserialize part
    // Here comes the unserialize part
    // Here comes the unserialize part
    // Here comes the unserialize part

    protected unSerializeString(string: string): string {
        return AutoItFunctions.binaryToString(string)
    }

    protected unSerializeInt(int: string): number {
        return parseInt(int)
    }

    protected unSerializeFloat(float: string): number {
        return parseFloat(float)
    }

    protected unSerializeBoolean(bool: string): boolean {
        return bool === '1'
    }

    protected unSerializeScriptingObject(val: string) {
        const oObj: object = {}
        const payload: string = this.unSerializeString(val)

        const parts: Array<string> = payload.split('$')

        parts.forEach((part) => {
            const subPart: Array<string> = part.split(':')
            const key = subPart[0]
            const val = subPart[1]

            oObj[key] = this.unSerialize(val)
        })

        return oObj
    }

    protected unSerializeArray(val: string): Array<any> {

        const payload: string = this.unSerializeString(val)
        const parts: Array<string> = payload.split('$')

        const aNew: Array<UnSerializedValue> = []

        parts.forEach((part) => {
            aNew.push(this.unSerialize(part))
        })

        return aNew
    }
}

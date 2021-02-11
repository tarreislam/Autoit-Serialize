import AutoItFunctions from "./src/AutoItFunctions";
import {AutoItTypes} from "./src/AutoItTypes";
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

        if (Array.isArray(source)) {
            return AutoitSerializeTypeFactory.make(AutoItTypes.Array, source, glue)
        } else if (source === null) {
            return AutoitSerializeTypeFactory.make(AutoItTypes.Keyword, null, glue)
        } else {
            switch (type) {
                case "object":
                    return 'o|xxx' + glue// TODO
                case 'string':
                    return 's|' + AutoItFunctions.stringToBinary(source) + glue
                case 'boolean':
                    return 'b|' + (source ? 1 : 0) + glue
                case 'bigint':
                    return 'Int64|' + source + glue
                case 'number':
                    return 'Double|' + source + glue
            }
        }
    }

    protected serializeArray(array: Array<any>) {
        let serializedArray: string

        array.forEach((item) => {
            serializedArray += this.serializeSerialize(item, '$')
        })

        serializedArray = array.length > 0 ? serializedArray.slice(0, -1) : serializedArray
        serializedArray = AutoItFunctions.stringToBinary(serializedArray)

        return serializedArray

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

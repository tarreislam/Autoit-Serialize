import AutoItFunctions from "../AutoIt/AutoItFunctions";
import {AutoItTypes} from "../AutoIt/AutoItTypes";
import {UnSerializedValue} from "../Types/UnSerializedValue";

export class UnSerialize {

    public unSerialize(source: string): UnSerializedValue {
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
                // Handle empty objects, yes this could probably be improved
                if (source === AutoItTypes.SpecialEmptyObject) {
                    return {}
                }
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

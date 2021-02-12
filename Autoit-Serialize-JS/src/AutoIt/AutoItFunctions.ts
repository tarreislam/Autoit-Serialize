// start by adding some sweet as microsoft libraries.
import {encode, decode} from 'iconv-lite'

export default class AutoItFunctions {

    public static binaryToString(str: any): string {
        if (typeof str !== 'string') {
            str = str.toString()
        }
        if (str.length === 0) {
            return ""
        }
        const buffer = Buffer.from(str.substring(2), 'hex')
        return decode(buffer, 'win1252').toString()
    }

    public static stringToBinary(str: string): string {
        if (str.length === 0) {
            return ""
        }
        return '0x' + encode(str, 'win1252').toString('hex').toUpperCase()
    }

}
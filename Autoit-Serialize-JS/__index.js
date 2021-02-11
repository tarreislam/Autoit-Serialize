const _UnSerialize = (source) => {

    const part = source.split('|')
    const type = part[0]
    const val = part[1]

    switch (type) {
        case 's':
            return BinaryToString(val)
        case 'a':
            return __Serialize_UnSerializeArray(val)
        case 'o':
            return __Serialize_UnSerializeScriptingDictionary(val)
        case 'b':
            return val === '1'
        case 'Int32':
        case 'Int64':
            return parseInt(val)
        case' Double':
            return parseFloat(val)
        case 'Ptr':
        case 'Binary':
            return hexEncode(val)
        case 'Keyword':
            return null
    }
}

const __Serialize_UnSerializeArray = (val) => {
    const payload = BinaryToString(val)
    const parts = payload.split('$')

    const aNew = []

    parts.forEach((part) => {
        aNew.push(_UnSerialize(part))
    })

    return aNew

}

const __Serialize_UnSerializeScriptingDictionary = (val) => {
    const oObj = {}
    const payload = BinaryToString(val)

    if (!payload) {
        return oObj
    }
    const parts = payload.split('$')

    parts.forEach((part) => {
        const subPart = part.split(':')
        const key = subPart[0]
        const val = subPart[1]

        oObj[key] = _UnSerialize(val)
    })

    return oObj

}

const BinaryToString = (source) => {
    return Buffer.from(source.substring(2), 'hex').toString('utf-8')
}

const hexEncode = (str) => {
    var hex, i
    var result = ''
    for (i = 0; i < str.length; i++) {
        hex = str.charCodeAt(i).toString(16)
        result += ('000' + hex).slice(-4)
    }

    return result
}


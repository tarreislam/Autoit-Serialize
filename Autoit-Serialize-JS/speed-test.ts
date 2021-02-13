import Serializer from './index'

const staticPayload = () => {
    return {
        test: "1337",
        array: [1, "tarre hehe", 0x1337, 10.5],
        person: {
            name: "tarre",
            testNull: null
        }

    }
}

const diffInSeconds = (dt: Date) => {
    return ((new Date).getTime() - dt.getTime()) / 1000
}

const bm = (name, cb) => {
    const maxSeconds = 30
    const timer = new Date
    let iterations = 0
    while (diffInSeconds(timer) < maxSeconds) {
        cb()
        iterations++
    }
    const seconds = diffInSeconds(timer);
    const ips = Math.round(iterations / seconds)
    console.log(name + '. IPS: ' + ips + ' @ ' + maxSeconds + ' seconds')
}

const serializedPayload = Serializer.serialize(staticPayload())
const serializedPayloadAsJson = JSON.stringify(staticPayload())

console.log('Serialized AUS len = ' + serializedPayload.length)
console.log('Serialized JSON len = ' + serializedPayloadAsJson.length)


bm('AUS: Serialize', () => {
    Serializer.serialize(staticPayload())
})

bm('AUS: UnSerialize', () => {
    Serializer.unSerialize(serializedPayload)
})

bm('AUS: Serialize+UnSerialize', () => {
    Serializer.unSerialize(Serializer.serialize(staticPayload()))
})

// same tests but with JSON (To see comparsion)

bm('JSON: Serialize', () => {
    JSON.stringify(staticPayload())
})

bm('JSON: UnSerialize', () => {
    JSON.parse(serializedPayloadAsJson)
})

bm('JSON: Serialize+UnSerialize', () => {
    JSON.parse(JSON.stringify(staticPayload()))
})

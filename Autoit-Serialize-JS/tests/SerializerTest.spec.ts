import {expect} from 'chai';
import 'mocha';
import {Serialize} from "../src/Serializers/Serialize";
import {UnSerialize} from "../src/Serializers/UnSerialize";

describe('Serializers/Serialize',
    () => {
        it('Static serialize comparison', () => {
            const serializer = new Serialize;
            const string: string = serializer.serialize('string')
            const number: string = serializer.serialize(1234)
            const booleanFalse: string = serializer.serialize(false)
            const booleanTrue: string = serializer.serialize(true)
            const nullKeyword: string = serializer.serialize(null)
            const array: string = serializer.serialize([1])
            const emptyObj: string = serializer.serialize({})
            const oneKeyObj: string = serializer.serialize({"key": 123, "abc": "123"})

            // These values are generated from autoit
            expect(string).eq('s|0x737472696E67')
            expect(number).eq('Int32|1234')
            expect(booleanFalse).eq('b|0')
            expect(booleanTrue).eq('b|1')
            expect(nullKeyword).eq('Keyword|')
            expect(array).eq('a|0x496E7433327C31')
            expect(emptyObj).eq('o|')
            expect(oneKeyObj).eq('o|0x6B65793A496E7433327C313233246162633A737C3078333133323333')
        });

    });

describe('Serializers/UnSerialize',
    () => {
        it('Static serialize comparison', () => {
            const unSerialize = new UnSerialize;

            // These values are generated from autoit
            const string = 's|0x737472696E67'
            const number = 'Int32|1234'
            const booleanFalse = 'b|0'
            const booleanTrue = 'b|1'
            const nullKeyword = 'Keyword|'
            const array = 'a|0x496E7433327C31'
            const emptyObj = 'o|'
            const oneKeyObj = 'o|0x6B65793A496E7433327C313233246162633A737C3078333133323333'

            expect('string').eq(unSerialize.unSerialize(string))
            expect(1234).eq(unSerialize.unSerialize(number))
            expect(false).eq(unSerialize.unSerialize(booleanFalse))
            expect(true).eq(unSerialize.unSerialize(booleanTrue))
            expect(null).eq(unSerialize.unSerialize(nullKeyword))
            expect([1]).to.eql(unSerialize.unSerialize(array))
            expect({}).to.eql(unSerialize.unSerialize(emptyObj))
            expect({"key": 123, "abc": "123"}).to.eql(unSerialize.unSerialize(oneKeyObj))
        });

    });

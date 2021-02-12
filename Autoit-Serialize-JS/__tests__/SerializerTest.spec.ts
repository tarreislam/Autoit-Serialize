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
            const double: string = serializer.serialize(12.34)
            const booleanFalse: string = serializer.serialize(false)
            const booleanTrue: string = serializer.serialize(true)
            const nullKeyword: string = serializer.serialize(null)
            const emptyArray: string = serializer.serialize([]) // not supported by autoit
            const array: string = serializer.serialize([1])
            const emptyObj: string = serializer.serialize({})
            const oneKeyObj: string = serializer.serialize({"key": 123, "abc": "123"})
            const arrayOfObjects: string = serializer.serialize(
                [
                    {
                        name: "tarre",
                        age: 47
                    },
                    {
                        name: "tarre2",
                        age: 473
                    }
                ])

            // These values are generated from autoit
            expect(string).eq('s|0x737472696E67')
            expect(number).eq('Int32|1234')
            expect(double).eq('Double|12.34')
            expect(booleanFalse).eq('b|0')
            expect(booleanTrue).eq('b|1')
            expect(nullKeyword).eq('Keyword|')
            expect(emptyArray).eq('a|0x496E7433327C30') // This is [] <---
            expect(array).eq('a|0x496E7433327C31')
            expect(emptyObj).eq('o|')
            expect(oneKeyObj).eq('o|0x6B65793A496E7433327C313233246162633A737C3078333133323333')
            expect(arrayOfObjects).eq('a|0x6F7C307836453631364436353341373337433330373833373334333633313337333233373332333633353234363136373635334134393645373433333332374333343337246F7C307836453631364436353341373337433330373833373334333633313337333233373332333633353333333232343631363736353341343936453734333333323743333433373333')
        });

    });

describe('Serializers/UnSerialize',
    () => {
        it('Static unserialize comparison', () => {
            const unSerialize = new UnSerialize;

            // These values are generated from autoit
            const string = 's|0x737472696E67'
            const number = 'Int32|1234'
            const double = 'Double|12.34'
            const booleanFalse = 'b|0'
            const booleanTrue = 'b|1'
            const nullKeyword = 'Keyword|'
            const array = 'a|0x496E7433327C31'
            const emptyObj = 'o|'
            const oneKeyObj = 'o|0x6B65793A496E7433327C313233246162633A737C3078333133323333'
            const arrayOfObjects = 'a|0x6F7C307836453631364436353341373337433330373833373334333633313337333233373332333633353234363136373635334134393645373433333332374333343337246F7C307836453631364436353341373337433330373833373334333633313337333233373332333633353333333232343631363736353341343936453734333333323743333433373333'


            expect('string').eq(unSerialize.unSerialize(string))
            expect(1234).eq(unSerialize.unSerialize(number))
            expect(12.34).eq(unSerialize.unSerialize(double))
            expect(false).eq(unSerialize.unSerialize(booleanFalse))
            expect(true).eq(unSerialize.unSerialize(booleanTrue))
            expect(null).eq(unSerialize.unSerialize(nullKeyword))
            expect([1]).to.eql(unSerialize.unSerialize(array))
            expect({}).to.eql(unSerialize.unSerialize(emptyObj))
            expect({"key": 123, "abc": "123"}).to.eql(unSerialize.unSerialize(oneKeyObj))
            expect([
                {
                    name: "tarre",
                    age: 47
                },
                {
                    name: "tarre2",
                    age: 473
                }
            ]).to.eql(unSerialize.unSerialize(arrayOfObjects))

        });

    });

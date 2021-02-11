import {expect} from 'chai';
import 'mocha';
import AutoitSerializeTypeFactory from "../src/AutoitSerializeTypeFactory";
import {AutoItTypes} from "../src/AutoIt/AutoItTypes";

describe('AutoitSerializeTypeFactory.make',
    () => {
        it('should create a string with hashtag glue', () => {
            const result = new AutoitSerializeTypeFactory('#');
            expect(result.make(AutoItTypes.Array, 'test')).to.equal('a|test#');
        });
        it('should create a string with no content ', () => {
            const result = new AutoitSerializeTypeFactory('#');
            expect(result.make(AutoItTypes.Keyword, null)).to.equal('Keyword|null#');
        });

    });

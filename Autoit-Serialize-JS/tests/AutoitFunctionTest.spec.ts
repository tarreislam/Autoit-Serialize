import AutoItFunctions from "../src/AutoItFunctions";
import {expect} from 'chai';
import 'mocha';

describe('AutoItFunctions.binaryToString',
    () => {
        it('should convert binary to string', () => {
            const result = AutoItFunctions.binaryToString('0x31333337');
            expect(result).to.equal('1337');
        });
        it('should convert binary to string', () => {
            const result = AutoItFunctions.binaryToString('0xE5E5E4F6C5C4D62927EBFBE579E569');
            expect(result).to.equal('ååäöÅÄÖ)\'ëûåyåi');
        });
    });

describe('AutoItFunctions.stringToBinary',
    () => {
        it('should convert string to binary', () => {
            const result = AutoItFunctions.stringToBinary('1337');
            expect(result).to.equal('0x31333337');
        });
        it('should convert string to binary', () => {
            const result = AutoItFunctions.stringToBinary('ååäöÅÄÖ)\'ëûåyåi');
            expect(result).to.equal('0xE5E5E4F6C5C4D62927EBFBE579E569');
        });
    });

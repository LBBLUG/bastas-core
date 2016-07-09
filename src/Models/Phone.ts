/**
 * Created by daniefer on 7/9/16.
 */

import { ParseResult } from './ParseResult'

export class Phone {
    public phoneNumber: String;
    public areaCode: String;
    constructor(phoneNumberString: string, requireWellFormed: boolean = true) {
        let parseResult: ParseResult<string> = Phone.TryParse(phoneNumberString);
        if (requireWellFormed && parseResult.succeeded) {
            throw new PhoneNumberParseError(phoneNumberString)
        }
        this.phoneNumber = parseResult.obj;
        this.areaCode = parseResult.obj.substring(1,3);
        return
    }
    
    public static Equals(phoneA: Phone, phoneB: Phone): boolean {
        return phoneA.phoneNumber == phoneB.phoneNumber
    }

    private static TryParse(phoneNumberString: string): ParseResult<string> {
        // Remove extra spaces
        phoneNumberString = phoneNumberString.trim();

        // If phone number starts with a "+" remove it
        if (phoneNumberString.substring(0, 0) == "+") {
            phoneNumberString = phoneNumberString.substring(1);
        }
        // US phone number ##########
        if (new RegExp('\d{10}').test(phoneNumberString)) {
            return new ParseResult(true, `(${phoneNumberString.substring(0, 2)}) ` +
                `${phoneNumberString.substring(3, 5)}-${phoneNumberString.substring(6)}`)
        }
        // US phone number ### ### #### or ###-###-####
        if (new RegExp('\d{3}[ \-]\d{3}[ \-]\d{4}').test(phoneNumberString)) {
            return new ParseResult(true, `(${phoneNumberString.substring(0, 2)}) ` +
                `${phoneNumberString.substring(4, 6)}-${phoneNumberString.substring(8)}`)
        }
        // US phone number (###) ### #### or (###)-###-####
        if (new RegExp('\(\d{3}\)[ \-]\d{3}[ \-]\d{4}').test(phoneNumberString)) {
            return new ParseResult(true, `(${phoneNumberString.substring(1, 3)}) ` +
                `${phoneNumberString.substring(6, 8)}-${phoneNumberString.substring(10)}`)
        }
        // We don't have a case for this so say parse failed and
        // return the original string minus the leading/trailing
        // spaces and a "+" if it existed.
        return new ParseResult(false, phoneNumberString)
    }
}

export class PhoneNumberParseError extends Error {
    constructor(phoneNumberString: string) {
        super(`Unable to parse ${phoneNumberString} into a phone number.`)
    }
}

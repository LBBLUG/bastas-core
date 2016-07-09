/**
 * Created by daniefer on 7/9/16.
 */

import { Person } from './Person'
import { Phone } from './Phone'
import { Gender } from './Gender'

export class Recipient extends Person {
    constructor(id: string, firstName: string, middleName: string, lastName: string,
                gender: Gender, homePhone: Phone, cellPhone: Phone,
                public route: string) {
        super(id, firstName, middleName, lastName, gender, homePhone, cellPhone);
        return
    }
}


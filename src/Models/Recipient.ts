/**
 * Created by daniefer on 7/9/16.
 */

import { Person } from './Person'
import { Phone } from './Phone'
import { Gender } from './Gender'
import {Address} from "./Address";
import {Gift} from "./Gift";

export class CoreRecipient extends Person {
    constructor(id: string, firstName: string, middleName: string, lastName: string,
                gender: Gender, homePhone: Phone, cellPhone: Phone,
                public route: string) {
        super(id, firstName, middleName, lastName, gender, homePhone, cellPhone);
        return
    }
}

export class Recipient extends CoreRecipient {
    public address: Address;
    public gifts: Gift[];
    
    constructor(id: string, firstName: string, middleName: string, lastName: string,
                gender: Gender, homePhone: Phone, cellPhone: Phone,
                public route: string) {
        super(id, firstName, middleName, lastName, gender, homePhone, cellPhone, route);
        this.gifts = [];
    }
}


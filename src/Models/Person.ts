/**
 * Created by daniefer on 7/9/16.
 */

import { Gender } from './Gender'
import { Phone } from './Phone'
import { BaseModel } from "./BaseModel";

export class Person extends BaseModel<string> {
    constructor(id: string, public firstName: string, public middleName: string, public lastName: string,
                public gender: Gender, public homePhone: Phone, public cellPhone: Phone) {
        super(id);
        return
    }
}

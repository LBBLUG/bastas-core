/**
 * Created by daniefer on 7/9/16.
 */

import { BaseModel } from './BaseModel'

export class Address extends BaseModel<string> {
    constructor(id: string, public address: string, public city: string, public state: string, public zip: string) {
        super(id)
        return
    }
}

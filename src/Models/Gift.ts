/**
 * Created by daniefer on 7/9/16.
 */

import { GiftStatus } from './GiftStatus'
import { BaseModel } from './BaseModel'

export class Gift extends BaseModel<string> {
    constructor(id: string, public description: string, public status: GiftStatus) {
        super(id);
        return
    }
}

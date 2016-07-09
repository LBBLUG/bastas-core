/**
 * Created by daniefer on 7/9/16.
 */

/// <reference path="../../typings/index.d.ts" />

import { Gift } from '../Models/Gift'
import { BaseRepository } from "./BaseRepository";
import { RepositoryKeyGenerator} from "./BaseRepositoryDelegates";

var _ = require('underscore');

export class GiftRepository extends BaseRepository<string, Gift> {

    constructor(keyGenerator: RepositoryKeyGenerator<Gift, string>) {
        super(keyGenerator, GiftRepository.updateHandler, GiftRepository.selectHandler);
    }

    private static updateHandler(sourceGift: Gift, destGift: Gift): void {
        destGift.description = sourceGift.description;
        destGift.status = sourceGift.status;
    }

    private static selectHandler(giftA: Gift, matchesGiftB: Gift): boolean {
        /*
         * giftA: this will be the object from the data store
         * 
         * matchesGiftB: this will be the object sent to the data store to see if anything mathces it.
         * 
         */
        // if description is set to something and its text is contained
        // in another gift's description.
        // NOTE: this is not "starts with". This is "contains"
        if (matchesGiftB.description && giftA.description.indexOf(matchesGiftB.description, 0) < 0) {
            return false;
        }
        // if status is set to something and it matches
        if (matchesGiftB.status && giftA.status != matchesGiftB.status) {
            return false;
        }
        return true;
    }
}

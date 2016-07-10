/**
 * Created by daniefer on 7/9/16.
 */

/// <reference path="../../typings/index.d.ts" />

import {KeyValue} from "../Models/KeyValue";
    
var _ = require("underscore");

export class RecipientGiftRelationRepository {
    private relations: KeyValue<string, string[]>[];
    
    constructor() {
        this.relations = [];
    }
    
    public Update(recipientId: string, giftIds: string[]): void {
        let relationArray: KeyValue<string, string[]> = 
            _.findWhere(this.relations, {key: recipientId}) as KeyValue<string, string[]>;
        
        if (!relationArray){
            relationArray = new KeyValue<string, string[]>(recipientId, []);
            this.relations.push(relationArray);
        }
        
        relationArray.value = giftIds;
        return
    }
}
/**
 * Created by daniefer on 7/9/16.
 */

/// <reference path="../../typings/index.d.ts" />

import {Recipient, CoreRecipient} from "../Models/Recipient";
import {Gift} from "../Models/Gift";
import {RecipientRepository} from "../Repositories/RecipientRepository";
import {GiftRepository} from "../Repositories/GiftRepository";
import {AddressRepository} from "../Repositories/AddressRepository";
import {Address} from "../Models/Address";
import {RecipientGiftRelationRepository} from "../Repositories/RecipientGiftRelationRepository";

// There are no typings for this library. So everything has to be declared as "any"
// When we replace this with a database, we can remove this dependency
var uuid = require("node-uuid");
var assert = require("assert");
var _ = require("underscore");

export class RecipientController {
    private recipientRepository: RecipientRepository;
    private giftRepository: GiftRepository;
    private addressRepository: AddressRepository;
    private recipientGiftRelationRepository: RecipientGiftRelationRepository

    constructor() {
        this.recipientRepository = new RecipientRepository((recip: CoreRecipient): string => {
            return (uuid.v1() as any).toString();
        });
        this.giftRepository = new GiftRepository((gift: Gift): string => {
            return (uuid.v1() as any).toString();
        });
        this.addressRepository = new AddressRepository((address: Address): string => {
            return (uuid.v1() as any).toString();
        });
    }

    public SaveReciptient(recipient: Recipient): void {
        // check if recipient is undefined
        assert(recipient && recipient != null, `The 'recipient' cannot be null or undefined.`);

        // if there are any gifts save them
        if (recipient.gifts) {
            _.forEach(recipient.gifts, (gift: Gift): void => {
                if (!gift.id || gift.id == "") {
                    let id = this.giftRepository.Create(gift);
                    gift.id = id;
                }
                else {
                    this.giftRepository.Update(gift);
                }
            });
        }
        // if the address exits, create/update
        if (recipient.address) {
            if (!recipient.address.id && recipient.address.id == "") {
                let id = this.addressRepository.Create(recipient.address);
                recipient.address.id = id;
            }
            else {
                this.addressRepository.Update(recipient.address);
            }
        }
        // now save the recipient
        if (!recipient.id || recipient.id == "") {
            let id = this.recipientRepository.Create(recipient as CoreRecipient);
            recipient.id = id;
        }
        else {
            this.recipientRepository.Update(recipient);
        }
        
        // lastly, update the gift-recipient relation
        this.recipientGiftRelationRepository.Update(recipient.id,
                                                    _.map(recipient.gifts, (gift: Gift): string => gift.id));
        
        return
    }
}
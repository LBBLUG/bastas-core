/**
 * Created by daniefer on 7/9/16.
 */

import { CoreRecipient } from '../Models/Recipient'
import { BaseRepository } from "./BaseRepository";
import { RepositoryKeyGenerator } from "./BaseRepositoryDelegates";
import { Phone } from "../Models/Phone";

export class RecipientRepository extends BaseRepository<string, CoreRecipient> {

    constructor(keyGenerator: RepositoryKeyGenerator<CoreRecipient, string>) {
        super(keyGenerator, RecipientRepository.updateHandler, RecipientRepository.selectHandler)
        return
    }

    private static updateHandler(sourceRecipient: CoreRecipient, destRecipient: CoreRecipient): void {
        destRecipient.firstName = sourceRecipient.firstName;
        destRecipient.middleName = sourceRecipient.middleName;
        destRecipient.lastName = sourceRecipient.lastName;
        destRecipient.route = sourceRecipient.route;
        destRecipient.cellPhone = sourceRecipient.cellPhone;
        destRecipient.homePhone = sourceRecipient.homePhone;
        destRecipient.gender = sourceRecipient.gender;
    };

    private static selectHandler(recipientA: CoreRecipient, matchesRecipientB: CoreRecipient): boolean {
        if (matchesRecipientB.firstName &&
            recipientA.firstName.indexOf(matchesRecipientB.firstName) < 0) {
            return false;
        }
        if (matchesRecipientB.middleName &&
            recipientA.firstName.indexOf(matchesRecipientB.firstName) < 0) {
            return false;
        }
        if (matchesRecipientB.lastName &&
            recipientA.firstName.indexOf(matchesRecipientB.firstName) < 0) {
            return false;
        }
        if (matchesRecipientB.route &&
            recipientA.firstName.indexOf(matchesRecipientB.firstName) < 0) {
            return false;
        }
        if (matchesRecipientB.cellPhone &&
            !Phone.Equals(recipientA.cellPhone, matchesRecipientB.cellPhone)) {
            return false;
        }
        if (matchesRecipientB.homePhone &&
            !Phone.Equals(recipientA.homePhone, matchesRecipientB.homePhone)) {
            return false;
        }
        if (matchesRecipientB.gender && recipientA.gender != matchesRecipientB.gender) {
            return false;
        }
        return true;
    }
}
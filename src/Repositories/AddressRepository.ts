/**
 * Created by daniefer on 7/9/16.
 */

/// <reference path="../../typings/index.d.ts" />

import {BaseRepository} from "./BaseRepository";
import {Address} from "../Models/Address";
import {RepositoryKeyGenerator} from "./BaseRepositoryDelegates";

export class AddressRepository extends BaseRepository<string, Address> {
    constructor(keyGenerator: RepositoryKeyGenerator<Address, string>) {
        super(keyGenerator, AddressRepository.updateHandler, AddressRepository.selectHandler)
    }
 
    private static updateHandler(sourceAddress: Address, destAddress: Address): void {
        destAddress.address = sourceAddress.address;
        destAddress.city = sourceAddress.city;
        destAddress.state = sourceAddress.state;
        destAddress.zip = sourceAddress.zip;
        return
    }

    private static selectHandler(addressA: Address, matchesAddressB: Address): boolean {
        if (matchesAddressB.address &&
            addressA.address.indexOf(matchesAddressB.address) < 0) {
            return false;
        }
        if (matchesAddressB.city &&
            addressA.city.indexOf(matchesAddressB.city) < 0) {
            return false;
        }
        if (matchesAddressB.state &&
            addressA.state.indexOf(matchesAddressB.state) < 0) {
            return false;
        }
        if (matchesAddressB.zip &&
            addressA.zip.indexOf(matchesAddressB.zip) < 0) {
            return false;
        }
        return true;
    }
}
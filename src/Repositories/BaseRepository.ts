/**
 * Created by daniefer on 7/9/16.
 */

/// <reference path="../../typings/index.d.ts" />

import { IRepository } from "./IRepository";
import { KeyValue } from "../Models/KeyValue";
import { ResourceNotFoundError } from "./RepositoryErrors";
import { BaseModel } from "../Models/BaseModel";
import { RepositoryUpdateDelegate,
         RepositoryEqualityDelegate,
         RepositoryKeyGenerator } from "./BaseRepositoryDelegates";

export class BaseRepository<TKey, T extends BaseModel<TKey>> implements IRepository<TKey, T>{
    protected dataStore: KeyValue<TKey, T>[] = [];
    protected updateHandler: RepositoryUpdateDelegate<T>;
    protected equalityProvider: RepositoryEqualityDelegate<T>;
    protected keyGenerator: RepositoryKeyGenerator<T, TKey>;

    // Functions are initialized in the constructor to allow us to 
    // create closures. Javascript sucks, so that is why we need them.
    public Create: (obj: T) => T;
    public Retrieve: (obj?: T) => T[];
    public Update: (obj: T) => T;
    public Delete: (key: TKey) => void;

    constructor(keyGenerator: RepositoryKeyGenerator<T, TKey>,
                updateHandler: RepositoryUpdateDelegate<T>,
                equalityProvider: RepositoryEqualityDelegate<T>) {
        this.keyGenerator = keyGenerator;
        this.updateHandler = updateHandler;
        this.equalityProvider = equalityProvider;

        this.Create = function (obj: T): T {
            let key = keyGenerator(obj); // create new key
            this.dataStore.push(new KeyValue(key, obj));
            return obj;
        };

        this.Update = function (obj: T): T {
            var target: KeyValue<TKey, T> = _.findWhere(this.dataStore, {key: obj.id}) as KeyValue<TKey, T>;
            if (!target) {
                throw new ResourceNotFoundError(obj.id.toString());
            }
            this.updateHandler(obj, target.value);
            return obj;
        };

        this.Delete = function (key: TKey): void {
            var target: KeyValue<TKey, T> = _.findWhere(this.dataStore, {key: key}) as KeyValue<TKey, T>;
            // someone has already deleted this record. Just return.
            if (!target) {
                return;
            }
            let index = this.dataStore.indexOf(target);
            this.dataStore.splice(index, 1);
            return;
        };

        this.Retrieve = function (obj?: T): T[] {
            let results = _.filter(this.dataStore, function (arrayObj: T): boolean {
                // If there is no gift provided, return everything;
                if (!arrayObj) {
                    return true;
                }

                return this.equalityHandler(arrayObj, obj);
            });

            // This is leaky. Users of this repo can update the objects in the store if they
            // want. Really need to do a deep copy to prevent this. When this is swapped out
            // for a database, this won't be an issue (unless we cache).
            return results;
        };
    }
}
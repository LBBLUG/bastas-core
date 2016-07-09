/**
 * Created by daniefer on 7/9/16.
 */

/// <reference path="../../typings/index.d.ts" />

export interface IRepository<TKey, T> {
    Create(obj: T): T;
    Retrieve(obj?: T): T[];
    Update(obj: T): T;
    Delete(key: TKey): void;
}
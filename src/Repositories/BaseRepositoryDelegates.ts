/**
 * Created by daniefer on 7/9/16.
 */

export interface RepositoryUpdateDelegate<T> {
    (sourceObj: T, destObj: T): void;
}

export interface RepositoryEqualityDelegate<T> {
    /*
     * objectA: this will be the object from the data store
     * 
     * matchesObjectB: this will be the object sent to the data store to see if anything matches it.
     * 
     */
    (objectA: T, matchesObjectB: T): boolean;
}

export interface RepositoryKeyGenerator<Tin, TOut> {
    (obj: Tin): TOut;
}

/**
 * Created by daniefer on 7/9/16.
 */

export class ResourceNotFoundError extends Error {
    constructor(keyAsString: String){
        super(`The key '${keyAsString}' does not exist in the Repository.`)
    }
}

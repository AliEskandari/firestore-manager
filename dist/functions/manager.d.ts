import { Firestore } from "firebase/firestore";
import { FindFunctionWithArg, FindFunction } from "./find";
import { NewFunction, NewFunctionWithArg } from "./new";
import { DeleteFunction, DeleteFunctionWithArg } from "./delete";
import { CreateFunction, CreateFunctionWithArg } from "./create";
import { FindByIdFunction, FindByIdFunctionWithArg } from "./findById";
import { FindOneFunction, FindOneFunctionWithArg } from "./findOne";
import { FindOneAndUpdateFunction, FindOneAndUpdateFunctionWithArg } from "./findOneAndUpdate";
import { UpdateFunction, UpdateFunctionWithArg } from "./update";
import { DeleteManyFunction, DeleteManyFunctionWithArg } from "./deleteMany";
import { Identifiable } from "../types/Identifiable";
import { FindOneOrCreateFunction, FindOneOrCreateFunctionWithArg } from "./findOneOrCreate";
import { SaveFunctionWithArg, SaveFunction } from "./save";
import { FindAllFunction } from "./findAll";
type ManagerOptions = {
    debug: boolean;
    collectionId?: string;
};
export declare function manager<T extends Identifiable>({ db, collectionId, _default, options, }: {
    db: Firestore;
    collectionId: string;
    _default?: T;
    options?: ManagerOptions;
}): {
    new: NewFunction<T>;
    find: FindFunction<T>;
    delete: DeleteFunction<T>;
    create: CreateFunction<T>;
    /**
     * Save a document to a collection.  If the document does not exist, it will
     * be created.  If it does exist, it will be **overwritten**. If you want to
     * update a document, use the `update` function.
     * @param data The data to save
     * @returns A Promise resolved with the saved doc once the data has been
     * successfully written to the backend (note that it won't resolve
     * while you're offline).
     */
    save: SaveFunction<T>;
    findById: FindByIdFunction<T>;
    findOne: FindOneFunction<T>;
    findOneAndUpdate: FindOneAndUpdateFunction<T>;
    findOneOrCreate: FindOneOrCreateFunction<T>;
    /**
     * Update a document in a collection.  This function will throw
     * an error if the document does not exist.
     * @param id The id of the document to update
     * @param data The data to update the document with
     * An object containing the fields and values with which to update the
     * document. Fields can contain dots to reference nested fields within
     * the document.
     * @returns A Promise resolved with the updated doc once the data has been
     * successfully written to the backend (note that it won't resolve
     * while you're offline).
     * @throws If the document does not exist
     */
    update: UpdateFunction<T>;
    deleteMany: DeleteManyFunction<T>;
};
export declare function manager<T extends Identifiable>({ db, collectionId, collectionPathFn, _default, options, }: {
    db: Firestore;
    collectionId: string;
    collectionPathFn: (id: string) => string;
    _default?: T;
    options?: ManagerOptions;
}): {
    new: NewFunctionWithArg<T>;
    find: FindFunctionWithArg<T>;
    findAll: FindAllFunction<T>;
    delete: DeleteFunctionWithArg<T>;
    create: CreateFunctionWithArg<T>;
    /**
     * Save a document to a collection.  If the document does not exist, it will
     * be created.  If it does exist, it will be **overwritten**. If you want to
     * update a document, use the `update` function.
     * @param data The data to save
     * @returns A Promise resolved with the saved doc once the data has been
     * successfully written to the backend (note that it won't resolve
     * while you're offline).
     */
    save: SaveFunctionWithArg<T>;
    findById: FindByIdFunctionWithArg<T>;
    findOne: FindOneFunctionWithArg<T>;
    findOneAndUpdate: FindOneAndUpdateFunctionWithArg<T>;
    findOneOrCreate: FindOneOrCreateFunctionWithArg<T>;
    /**
     * Update a document in a collection.  This function will throw
     * an error if the document does not exist.
     * @param parentId The id of the parent document
     * @param id The id of the document to update
     * @param data The data to update the document with
     * An object containing the fields and values with which to update the
     * document. Fields can contain dots to reference nested fields within
     * the document.
     * @returns A Promise resolved with the updated doc once the data has been
     * successfully written to the backend (note that it won't resolve
     * while you're offline).
     * @throws If the document does not exist
     */
    update: UpdateFunctionWithArg<T>;
    /**
     * Delete many documents from a collection. Finds the documents first, then
     * deletes them in a batch.
     */
    deleteMany: DeleteManyFunctionWithArg<T>;
};
export {};

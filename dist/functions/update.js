var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { doc, updateDoc, } from "firebase/firestore";
import dbDebug from "../modules/debug";
export const update = (db, collectionPath) => {
    if (typeof collectionPath === "function") {
        const updateFn = (parentId, id, data) => __awaiter(void 0, void 0, void 0, function* () {
            const _collectionPath = collectionPath(parentId);
            return updateWithCollectionPath(db, _collectionPath, id, data);
        });
        return updateFn;
    }
    else {
        const updateFn = (id, data, options) => __awaiter(void 0, void 0, void 0, function* () {
            return updateWithCollectionPath(db, collectionPath, id, data);
        });
        return updateFn;
    }
};
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
export const updateWithCollectionPath = (db, collectionPath, id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const debug = dbDebug.extend(collectionPath);
    debug("Updating %s with data %O...", id, data);
    const docRef = doc(db, collectionPath, id);
    const updatedData = Object.assign(Object.assign({}, data), { updatedAt: new Date().toISOString() });
    yield updateDoc(docRef, updatedData);
    return updatedData;
});

import debug from "../modules/debug";
import { collection, doc } from "firebase/firestore";
export const _new = (db, collectionPath, _default, options) => {
    if (typeof collectionPath === "function") {
        const newFn = (parentId, data) => {
            const _collectionPath = collectionPath(parentId);
            return newWithCollectionPath(db, _collectionPath, data, _default, options);
        };
        return newFn;
    }
    else {
        const newFn = (data) => {
            return newWithCollectionPath(db, collectionPath, data, _default, options);
        };
        return newFn;
    }
};
/**
 *
 * @param db The Firestore instance
 * @param collectionPath The path to the collection
 * @param data The data to use for the new document (optional)
 * @param _default The default values to use for the new document (optional)
 * @param options Options for the function (optional)
 * @returns
 */
export const newWithCollectionPath = (db, collectionPath, data, _default, options) => {
    if (options === null || options === void 0 ? void 0 : options.debug)
        debug("New doc in %s...", collectionPath);
    const docRef = doc(collection(db, collectionPath));
    const newDoc = Object.assign(Object.assign({}, structuredClone(_default !== null && _default !== void 0 ? _default : { id: "" })), data);
    newDoc.createdAt = new Date().toISOString();
    newDoc.updatedAt = new Date().toISOString();
    newDoc.id = docRef.id;
    return newDoc;
};

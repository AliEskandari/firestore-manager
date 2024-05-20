var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import debug from "../modules/debug";
import { collection, doc, setDoc } from "firebase/firestore";
import { merge } from "lodash";
import { newWithCollectionPath } from "./new";
export const create = (db, collectionPath, _default, options) => {
    if (typeof collectionPath === "function") {
        const createFn = (parentId, values) => __awaiter(void 0, void 0, void 0, function* () {
            const _collectionPath = collectionPath(parentId);
            return createWithCollectionPath(db, _collectionPath, values, _default, options);
        });
        return createFn;
    }
    else {
        const createFn = (values) => __awaiter(void 0, void 0, void 0, function* () {
            return createWithCollectionPath(db, collectionPath, values, _default, options);
        });
        return createFn;
    }
};
/**
 * Creates a document in the given collection. If the values contain an id, it will be used. Otherwise, a new id
 * will be generated. If the values contain a createdAt or updatedAt field, it will be overwritten. Otherwise,
 * the current time will be used. Values are merged with the default values.
 *
 * @param db The Firestore instance
 * @param collectionPath The path to the collection
 * @param values The values to create the document with
 * @param _default The default values to use if the values don't contain an id
 * @param options Options
 * @returns The created document
 */
export const createWithCollectionPath = (db, collectionPath, values, _default, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (options === null || options === void 0 ? void 0 : options.debug)
        debug("Creating document in %s", collectionPath);
    const newDoc = newWithCollectionPath(db, collectionPath, undefined, _default);
    if (((_a = values.id) === null || _a === void 0 ? void 0 : _a.length) == 0)
        delete values.id;
    delete values.createdAt;
    const _values = merge(newDoc, values);
    _values.createdAt = new Date().toISOString();
    _values.updatedAt = new Date().toISOString();
    console.log({ db });
    const docRef = doc(collection(db, collectionPath), _values.id);
    yield setDoc(docRef, _values);
    return _values;
});

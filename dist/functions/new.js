"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newWithCollectionPath = exports._new = void 0;
const debug_1 = __importDefault(require("../modules/debug"));
const firestore_1 = require("firebase/firestore");
const _new = (db, collectionPath, _default, options) => {
    if (typeof collectionPath === "function") {
        const newFn = (parentId, data) => {
            const _collectionPath = collectionPath(parentId);
            return (0, exports.newWithCollectionPath)(db, _collectionPath, data, _default, options);
        };
        return newFn;
    }
    else {
        const newFn = (data) => {
            return (0, exports.newWithCollectionPath)(db, collectionPath, data, _default, options);
        };
        return newFn;
    }
};
exports._new = _new;
/**
 *
 * @param db The Firestore instance
 * @param collectionPath The path to the collection
 * @param data The data to use for the new document (optional)
 * @param _default The default values to use for the new document (optional)
 * @param options Options for the function (optional)
 * @returns
 */
const newWithCollectionPath = (db, collectionPath, data, _default, options) => {
    if (options === null || options === void 0 ? void 0 : options.debug)
        (0, debug_1.default)("New doc in %s...", collectionPath);
    const docRef = (0, firestore_1.doc)((0, firestore_1.collection)(db, collectionPath));
    const newDoc = Object.assign(Object.assign({}, structuredClone(_default !== null && _default !== void 0 ? _default : { id: "" })), data);
    newDoc.createdAt = new Date().toISOString();
    newDoc.updatedAt = new Date().toISOString();
    newDoc.id = docRef.id;
    return newDoc;
};
exports.newWithCollectionPath = newWithCollectionPath;

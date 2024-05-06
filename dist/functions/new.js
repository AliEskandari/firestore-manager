var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import debug from "@/modules/debug";
import { collection, doc } from "firebase/firestore";
export var _new = function (db, collectionPath, _default) {
    if (typeof collectionPath === "function") {
        var newFn = function (parentId, data) {
            var _collectionPath = collectionPath(parentId);
            return newWithCollectionPath(db, _collectionPath, data, _default);
        };
        return newFn;
    }
    else {
        var newFn = function (data) {
            return newWithCollectionPath(db, collectionPath, data, _default);
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
export var newWithCollectionPath = function (db, collectionPath, data, _default, options) {
    if (options === null || options === void 0 ? void 0 : options.debug)
        debug("New doc in %s...", collectionPath);
    var docRef = doc(collection(db, collectionPath));
    var newDoc = __assign(__assign({}, structuredClone(_default !== null && _default !== void 0 ? _default : { id: "" })), data);
    newDoc.createdAt = new Date().toISOString();
    newDoc.updatedAt = new Date().toISOString();
    newDoc.id = docRef.id;
    return newDoc;
};

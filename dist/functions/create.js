"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWithCollectionPath = exports.create = void 0;
const debug_1 = __importDefault(require("../modules/debug"));
const firestore_1 = require("firebase/firestore");
const lodash_1 = require("lodash");
const new_1 = require("./new");
const create = (db, collectionPath, _default, options) => {
    if (typeof collectionPath === "function") {
        const createFn = (parentId, values) => __awaiter(void 0, void 0, void 0, function* () {
            const _collectionPath = collectionPath(parentId);
            return (0, exports.createWithCollectionPath)(db, _collectionPath, values, _default, options);
        });
        return createFn;
    }
    else {
        const createFn = (values) => __awaiter(void 0, void 0, void 0, function* () {
            return (0, exports.createWithCollectionPath)(db, collectionPath, values, _default, options);
        });
        return createFn;
    }
};
exports.create = create;
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
const createWithCollectionPath = (db, collectionPath, values, _default, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (options === null || options === void 0 ? void 0 : options.debug)
        (0, debug_1.default)("Creating document in %s", collectionPath);
    const newDoc = (0, new_1.newWithCollectionPath)(db, collectionPath, undefined, _default);
    if (((_a = values.id) === null || _a === void 0 ? void 0 : _a.length) == 0)
        delete values.id;
    delete values.createdAt;
    const _values = (0, lodash_1.merge)(newDoc, values);
    _values.createdAt = new Date().toISOString();
    _values.updatedAt = new Date().toISOString();
    console.log({ db });
    const docRef = (0, firestore_1.doc)((0, firestore_1.collection)(db, collectionPath), _values.id);
    yield (0, firestore_1.setDoc)(docRef, _values);
    return _values;
});
exports.createWithCollectionPath = createWithCollectionPath;

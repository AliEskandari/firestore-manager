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
exports.findById = void 0;
const firestore_1 = require("firebase/firestore");
const debug_1 = __importDefault(require("../modules/debug"));
const findById = (db, collectionPath) => {
    if (typeof collectionPath === "function") {
        const findByIdFn = (parentId, id, options) => {
            const _collectionPath = collectionPath(parentId);
            return findByIdWithCollectionPath(db, _collectionPath, id, options);
        };
        return findByIdFn;
    }
    else {
        const findByIdFn = (id, options) => {
            return findByIdWithCollectionPath(db, collectionPath, id, options);
        };
        return findByIdFn;
    }
};
exports.findById = findById;
const findByIdWithCollectionPath = (db, collectionPath, id, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        throw new Error("id is required");
    const debug = debug_1.default.extend(`${collectionPath}:findById`);
    debug("Finding doc with id %s...", id);
    const docRef = (0, firestore_1.doc)(db, collectionPath, id);
    const docSnap = yield (0, firestore_1.getDoc)(docRef);
    if (docSnap.exists()) {
        debug("Found doc with id %s and data %O...", id, docSnap.data());
        const data = docSnap.data();
        if (options === null || options === void 0 ? void 0 : options.onUpdate) {
            const unsub = (0, firestore_1.onSnapshot)(docRef, (docSnap) => {
                debug("Listening to document %s... was updated", id);
                const data = docSnap.data();
                options.onUpdate(data, unsub);
            });
            return [data, unsub];
        }
        return data;
    }
    else {
        debug("Doc with id %s not found", id);
        if (!options)
            return null;
        else
            return [null, null];
    }
});

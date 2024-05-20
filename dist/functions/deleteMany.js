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
exports.deleteMany = void 0;
const firestore_1 = require("firebase/firestore");
const debug_1 = __importDefault(require("../modules/debug"));
const find_1 = require("./find");
const deleteMany = (db, collectionPath) => {
    if (typeof collectionPath == "function") {
        const deleteManyFn = (parentId, clauses, options) => __awaiter(void 0, void 0, void 0, function* () {
            const _collectionPath = collectionPath(parentId);
            return deleteManyWithCollectionPath(db, _collectionPath, clauses, options);
        });
        return deleteManyFn;
    }
    else {
        const deleteManyFn = (clauses, options) => __awaiter(void 0, void 0, void 0, function* () {
            return deleteManyWithCollectionPath(db, collectionPath, clauses, options);
        });
        return deleteManyFn;
    }
};
exports.deleteMany = deleteMany;
/**
 * Delete many documents from a collection. Finds the documents first, then
 * deletes them in a batch.
 */
const deleteManyWithCollectionPath = (db, collectionPath, clauses, options) => __awaiter(void 0, void 0, void 0, function* () {
    (0, debug_1.default)("Deleting many from %s...", collectionPath);
    const docs = yield (0, find_1.findWithCollectionPath)(db, collectionPath, clauses, options);
    const batch = (0, firestore_1.writeBatch)(db);
    docs.forEach((data) => {
        const docRef = (0, firestore_1.doc)(db, collectionPath, data.id);
        batch.delete(docRef);
    });
    return batch.commit();
});

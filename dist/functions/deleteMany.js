var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { doc, writeBatch } from "firebase/firestore";
import debug from "../modules/debug";
import { findWithCollectionPath } from "./find";
export const deleteMany = (db, collectionPath) => {
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
/**
 * Delete many documents from a collection. Finds the documents first, then
 * deletes them in a batch.
 */
const deleteManyWithCollectionPath = (db, collectionPath, clauses, options) => __awaiter(void 0, void 0, void 0, function* () {
    debug("Deleting many from %s...", collectionPath);
    const docs = yield findWithCollectionPath(db, collectionPath, clauses, options);
    const batch = writeBatch(db);
    docs.forEach((data) => {
        const docRef = doc(db, collectionPath, data.id);
        batch.delete(docRef);
    });
    return batch.commit();
});

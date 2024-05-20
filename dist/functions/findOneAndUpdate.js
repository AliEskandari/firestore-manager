var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dbDebug from "../modules/debug";
import { findWithCollectionPath } from "./find";
import { updateWithCollectionPath } from "./update";
export const findOneAndUpdate = (db, collectionPath, options) => {
    if (typeof collectionPath === "function") {
        const findOneAndUpdateFn = (parentId, clauses, data, findOptions) => __awaiter(void 0, void 0, void 0, function* () {
            const _collectionPath = collectionPath(parentId);
            return findOneAndUpdateWithCollectionPath(db, _collectionPath, clauses, data, findOptions);
        });
        return findOneAndUpdateFn;
    }
    else {
        const findOneAndUpdateFn = (clauses, data, findOptions) => __awaiter(void 0, void 0, void 0, function* () {
            return findOneAndUpdateWithCollectionPath(db, collectionPath, clauses, data, findOptions);
        });
        return findOneAndUpdateFn;
    }
};
const findOneAndUpdateWithCollectionPath = (db, collectionPath, clauses, data, findOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const debug = dbDebug.extend(collectionPath);
    debug("Finding one and updating with constraints... %O and data ... %O", clauses, data);
    const results = yield findWithCollectionPath(db, collectionPath, clauses, findOptions);
    let one = null;
    if (results.length > 0) {
        debug("Found results, updating doc");
        one = results[0];
        yield updateWithCollectionPath(db, collectionPath, one.id, data);
    }
    else {
        debug("No results found");
    }
    return one;
});

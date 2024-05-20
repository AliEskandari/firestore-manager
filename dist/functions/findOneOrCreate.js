var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { set } from "lodash";
import dbDebug from "../modules/debug";
import { createWithCollectionPath } from "./create";
import { findWithCollectionPath } from "./find";
export const findOneOrCreate = (db, collectionPath, _default, options) => {
    if (typeof collectionPath === "function") {
        const findOneOrCreateFn = (parentId, clauses, data, options) => __awaiter(void 0, void 0, void 0, function* () {
            const _collectionPath = collectionPath(parentId);
            return findOneOrCreateWithCollectionPath(db, _collectionPath, clauses, data, _default, options);
        });
        return findOneOrCreateFn;
    }
    else {
        const findOneOrCreateFn = (clauses, data, options) => __awaiter(void 0, void 0, void 0, function* () {
            return findOneOrCreateWithCollectionPath(db, collectionPath, clauses, data, _default, options);
        });
        return findOneOrCreateFn;
    }
};
const findOneOrCreateWithCollectionPath = (db, collectionPath, clauses, data, _default, findOptions, options) => __awaiter(void 0, void 0, void 0, function* () {
    const debug = dbDebug.extend(collectionPath);
    debug("Finding one and creating with constraints... %O and data ... %O", clauses, data);
    const results = yield findWithCollectionPath(db, collectionPath, clauses, findOptions);
    let one;
    if (results.length > 0) {
        debug("Found results, updating doc");
        one = results[0];
    }
    else {
        debug("No results found, creating new doc");
        Object.entries(clauses).forEach(([key, value]) => {
            set(data, key, value);
        });
        one = yield createWithCollectionPath(db, collectionPath, data, _default);
    }
    return one;
});

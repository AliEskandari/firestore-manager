var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { collection, getDocs, limit, orderBy, query, startAfter, where, } from "firebase/firestore";
import dbDebug from "../modules/debug";
export const find = (db, collectionPath) => {
    if (typeof collectionPath === "function") {
        const findFn = (parentId, clauses, options) => __awaiter(void 0, void 0, void 0, function* () {
            const _collectionPath = collectionPath(parentId);
            return findWithCollectionPath(db, _collectionPath, clauses, options);
        });
        return findFn;
    }
    else {
        const findFn = (clauses, options) => __awaiter(void 0, void 0, void 0, function* () {
            return findWithCollectionPath(db, collectionPath, clauses, options);
        });
        return findFn;
    }
};
export const findWithCollectionPath = (db, collectionPath, clauses, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const debug = dbDebug.extend(collectionPath);
    debug("Finding docs with constraints... %O", clauses);
    const clausesArray = Object.entries(clauses !== null && clauses !== void 0 ? clauses : {});
    const queryContstraints = clausesArray.reduce((acc, [key, value]) => {
        if (Array.isArray(value) && !!value.length)
            acc.push(where(key, "in", value));
        else
            acc.push(where(key, "==", value));
        return acc;
    }, []);
    if (options === null || options === void 0 ? void 0 : options.sortBy)
        queryContstraints.push(orderBy(options.sortBy, (_a = options.sortDirection) !== null && _a !== void 0 ? _a : "desc"));
    if (options === null || options === void 0 ? void 0 : options.startAfter)
        queryContstraints.push(startAfter(options.startAfter));
    if (options === null || options === void 0 ? void 0 : options.limit)
        queryContstraints.push(limit(options.limit));
    const q = query(collection(db, collectionPath), ...queryContstraints);
    const querySnapshot = yield getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
});

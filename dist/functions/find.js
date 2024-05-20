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
exports.findWithCollectionPath = exports.find = void 0;
const firestore_1 = require("firebase/firestore");
const debug_1 = __importDefault(require("../modules/debug"));
const find = (db, collectionPath) => {
    if (typeof collectionPath === "function") {
        const findFn = (parentId, clauses, options) => __awaiter(void 0, void 0, void 0, function* () {
            const _collectionPath = collectionPath(parentId);
            return (0, exports.findWithCollectionPath)(db, _collectionPath, clauses, options);
        });
        return findFn;
    }
    else {
        const findFn = (clauses, options) => __awaiter(void 0, void 0, void 0, function* () {
            return (0, exports.findWithCollectionPath)(db, collectionPath, clauses, options);
        });
        return findFn;
    }
};
exports.find = find;
const findWithCollectionPath = (db, collectionPath, clauses, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const debug = debug_1.default.extend(collectionPath);
    debug("Finding docs with constraints... %O", clauses);
    const clausesArray = Object.entries(clauses !== null && clauses !== void 0 ? clauses : {});
    const queryContstraints = clausesArray.reduce((acc, [key, value]) => {
        if (Array.isArray(value) && !!value.length)
            acc.push((0, firestore_1.where)(key, "in", value));
        else
            acc.push((0, firestore_1.where)(key, "==", value));
        return acc;
    }, []);
    if (options === null || options === void 0 ? void 0 : options.sortBy)
        queryContstraints.push((0, firestore_1.orderBy)(options.sortBy, (_a = options.sortDirection) !== null && _a !== void 0 ? _a : "desc"));
    if (options === null || options === void 0 ? void 0 : options.startAfter)
        queryContstraints.push((0, firestore_1.startAfter)(options.startAfter));
    if (options === null || options === void 0 ? void 0 : options.limit)
        queryContstraints.push((0, firestore_1.limit)(options.limit));
    const q = (0, firestore_1.query)((0, firestore_1.collection)(db, collectionPath), ...queryContstraints);
    const querySnapshot = yield (0, firestore_1.getDocs)(q);
    return querySnapshot.docs.map((doc) => doc.data());
});
exports.findWithCollectionPath = findWithCollectionPath;

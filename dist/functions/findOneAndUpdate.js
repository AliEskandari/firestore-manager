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
exports.findOneAndUpdate = void 0;
const debug_1 = __importDefault(require("../modules/debug"));
const find_1 = require("./find");
const update_1 = require("./update");
const findOneAndUpdate = (db, collectionPath, options) => {
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
exports.findOneAndUpdate = findOneAndUpdate;
const findOneAndUpdateWithCollectionPath = (db, collectionPath, clauses, data, findOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const debug = debug_1.default.extend(collectionPath);
    debug("Finding one and updating with constraints... %O and data ... %O", clauses, data);
    const results = yield (0, find_1.findWithCollectionPath)(db, collectionPath, clauses, findOptions);
    let one = null;
    if (results.length > 0) {
        debug("Found results, updating doc");
        one = results[0];
        yield (0, update_1.updateWithCollectionPath)(db, collectionPath, one.id, data);
    }
    else {
        debug("No results found");
    }
    return one;
});

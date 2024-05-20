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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = void 0;
const find_1 = require("./find");
const findOne = (db, collectionPath) => {
    if (typeof collectionPath === "function") {
        const findOneFn = (parentId, clauses, options) => __awaiter(void 0, void 0, void 0, function* () {
            const _collectionPath = collectionPath(parentId);
            return findOneWithCollectionPath(db, _collectionPath, clauses, options);
        });
        return findOneFn;
    }
    else {
        const findOneFn = (clauses, options) => __awaiter(void 0, void 0, void 0, function* () {
            return findOneWithCollectionPath(db, collectionPath, clauses, options);
        });
        return findOneFn;
    }
};
exports.findOne = findOne;
const findOneWithCollectionPath = (db, collectionPath, clauses, options) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield (0, find_1.findWithCollectionPath)(db, collectionPath, clauses, options);
    if (results.length > 0)
        return results[0];
    else
        return null;
});

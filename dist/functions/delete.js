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
exports._delete = void 0;
const firestore_1 = require("firebase/firestore");
const debug_1 = __importDefault(require("../modules/debug"));
const _delete = (db, collectionPath) => {
    if (typeof collectionPath == "function") {
        const deleteFn = (parentId, id) => __awaiter(void 0, void 0, void 0, function* () {
            const _collectionPath = collectionPath(parentId);
            return deleteWithCollectionPath(db, _collectionPath, id);
        });
        return deleteFn;
    }
    else {
        const deleteFn = (id) => __awaiter(void 0, void 0, void 0, function* () {
            return deleteWithCollectionPath(db, collectionPath, id);
        });
        return deleteFn;
    }
};
exports._delete = _delete;
const deleteWithCollectionPath = (db, collectionPath, id) => {
    const debug = debug_1.default.extend(collectionPath);
    debug("Deleting doc with id %s", id);
    const docRef = (0, firestore_1.doc)(db, collectionPath, id);
    return (0, firestore_1.deleteDoc)(docRef);
};

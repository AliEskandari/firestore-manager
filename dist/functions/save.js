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
exports.saveWithCollectionPath = exports.save = void 0;
const firestore_1 = require("firebase/firestore");
const debug_1 = __importDefault(require("../modules/debug"));
const save = (db, collectionPath) => {
    if (typeof collectionPath === "function") {
        const saveFn = (parentId, data) => __awaiter(void 0, void 0, void 0, function* () {
            const _collectionPath = collectionPath(parentId);
            return (0, exports.saveWithCollectionPath)(db, _collectionPath, data);
        });
        return saveFn;
    }
    else {
        const saveFn = (data) => __awaiter(void 0, void 0, void 0, function* () {
            return (0, exports.saveWithCollectionPath)(db, collectionPath, data);
        });
        return saveFn;
    }
};
exports.save = save;
const saveWithCollectionPath = (db, collectionPath, data) => __awaiter(void 0, void 0, void 0, function* () {
    const debug = debug_1.default.extend(`${collectionPath}/${data.id}`);
    debug("Saving with data %O...", data);
    const docRef = (0, firestore_1.doc)(db, collectionPath, data.id);
    const savedData = Object.assign(Object.assign({}, data), { updatedAt: new Date().toISOString() });
    yield (0, firestore_1.setDoc)(docRef, savedData);
    return savedData;
});
exports.saveWithCollectionPath = saveWithCollectionPath;

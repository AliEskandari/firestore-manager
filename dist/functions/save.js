var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { doc, setDoc } from "firebase/firestore";
import dbDebug from "../modules/debug";
export const save = (db, collectionPath) => {
    if (typeof collectionPath === "function") {
        const saveFn = (parentId, data) => __awaiter(void 0, void 0, void 0, function* () {
            const _collectionPath = collectionPath(parentId);
            return saveWithCollectionPath(db, _collectionPath, data);
        });
        return saveFn;
    }
    else {
        const saveFn = (data) => __awaiter(void 0, void 0, void 0, function* () {
            return saveWithCollectionPath(db, collectionPath, data);
        });
        return saveFn;
    }
};
export const saveWithCollectionPath = (db, collectionPath, data) => __awaiter(void 0, void 0, void 0, function* () {
    const debug = dbDebug.extend(`${collectionPath}/${data.id}`);
    debug("Saving with data %O...", data);
    const docRef = doc(db, collectionPath, data.id);
    const savedData = Object.assign(Object.assign({}, data), { updatedAt: new Date().toISOString() });
    yield setDoc(docRef, savedData);
    return savedData;
});

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { doc, getDoc, onSnapshot, } from "firebase/firestore";
import dbDebug from "../modules/debug";
export var findById = function (db, collectionPath) {
    if (typeof collectionPath === "function") {
        var findByIdFn = function (parentId, id, options) {
            var _collectionPath = collectionPath(parentId);
            return findByIdWithCollectionPath(db, _collectionPath, id, options);
        };
        return findByIdFn;
    }
    else {
        var findByIdFn = function (id, options) {
            return findByIdWithCollectionPath(db, collectionPath, id, options);
        };
        return findByIdFn;
    }
};
var findByIdWithCollectionPath = function (db, collectionPath, id, options) { return __awaiter(void 0, void 0, void 0, function () {
    var debug, docRef, docSnap, data, unsub_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!id)
                    throw new Error("id is required");
                debug = dbDebug.extend("".concat(collectionPath, ":findById"));
                debug("Finding doc with id %s...", id);
                docRef = doc(db, collectionPath, id);
                return [4 /*yield*/, getDoc(docRef)];
            case 1:
                docSnap = _a.sent();
                if (docSnap.exists()) {
                    debug("Found doc with id %s and data %O...", id, docSnap.data());
                    data = docSnap.data();
                    if (options === null || options === void 0 ? void 0 : options.onUpdate) {
                        unsub_1 = onSnapshot(docRef, function (docSnap) {
                            debug("Listening to document %s... was updated", id);
                            var data = docSnap.data();
                            options.onUpdate(data, unsub_1);
                        });
                        return [2 /*return*/, [data, unsub_1]];
                    }
                    return [2 /*return*/, data];
                }
                else {
                    debug("Doc with id %s not found", id);
                    if (!options)
                        return [2 /*return*/, null];
                    else
                        return [2 /*return*/, [null, null]];
                }
                return [2 /*return*/];
        }
    });
}); };

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
import debug from "../modules/debug";
import { collection, doc, setDoc } from "firebase/firestore";
import { merge } from "lodash";
import { newWithCollectionPath } from "./new";
export var create = function (db, collectionPath, _default, options) {
    if (typeof collectionPath === "function") {
        var createFn = function (parentId, values) { return __awaiter(void 0, void 0, void 0, function () {
            var _collectionPath;
            return __generator(this, function (_a) {
                _collectionPath = collectionPath(parentId);
                return [2 /*return*/, createWithCollectionPath(db, _collectionPath, values, _default, options)];
            });
        }); };
        return createFn;
    }
    else {
        var createFn = function (values) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, createWithCollectionPath(db, collectionPath, values, _default, options)];
            });
        }); };
        return createFn;
    }
};
/**
 * Creates a document in the given collection. If the values contain an id, it will be used. Otherwise, a new id
 * will be generated. If the values contain a createdAt or updatedAt field, it will be overwritten. Otherwise,
 * the current time will be used. Values are merged with the default values.
 *
 * @param db The Firestore instance
 * @param collectionPath The path to the collection
 * @param values The values to create the document with
 * @param _default The default values to use if the values don't contain an id
 * @param options Options
 * @returns The created document
 */
export var createWithCollectionPath = function (db, collectionPath, values, _default, options) { return __awaiter(void 0, void 0, void 0, function () {
    var newDoc, _values, docRef;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (options === null || options === void 0 ? void 0 : options.debug)
                    debug("Creating document in %s", collectionPath);
                newDoc = newWithCollectionPath(db, collectionPath, undefined, _default);
                if (((_a = values.id) === null || _a === void 0 ? void 0 : _a.length) == 0)
                    delete values.id;
                delete values.createdAt;
                _values = merge(newDoc, values);
                _values.createdAt = new Date().toISOString();
                _values.updatedAt = new Date().toISOString();
                console.log({ db: db });
                docRef = doc(collection(db, collectionPath), _values.id);
                return [4 /*yield*/, setDoc(docRef, _values)];
            case 1:
                _b.sent();
                return [2 /*return*/, _values];
        }
    });
}); };

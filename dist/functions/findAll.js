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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { collectionGroup, getDocs, limit, orderBy, query, startAfter, where, } from "firebase/firestore";
import dbDebug from "@/modules/debug";
export var findAll = function (db, collectionId) {
    var findAllFn = function (clauses, options) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, findAllWithCollectionId(db, collectionId, clauses, options)];
        });
    }); };
    return findAllFn;
};
export var findAllWithCollectionId = function (db, collectionId, clauses, options) { return __awaiter(void 0, void 0, void 0, function () {
    var debug, clausesArray, queryContstraints, q, querySnapshot;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                debug = dbDebug.extend(collectionId);
                debug("Finding all docs accross all '%s' collections with contraints... %O", collectionId, clauses);
                clausesArray = Object.entries(clauses !== null && clauses !== void 0 ? clauses : {});
                queryContstraints = clausesArray.reduce(function (acc, _a) {
                    var key = _a[0], value = _a[1];
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
                q = query.apply(void 0, __spreadArray([collectionGroup(db, collectionId)], queryContstraints, false));
                return [4 /*yield*/, getDocs(q)];
            case 1:
                querySnapshot = _b.sent();
                return [2 /*return*/, querySnapshot.docs.map(function (doc) { return doc.data(); })];
        }
    });
}); };

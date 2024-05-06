var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { find } from "./find";
import { _new } from "./new";
import { _delete } from "./delete";
import { create } from "./create";
import { findById, } from "./findById";
import { findOne } from "./findOne";
import { findOneAndUpdate, } from "./findOneAndUpdate";
import { update } from "./update";
import { deleteMany, } from "./deleteMany";
import { findOneOrCreate, } from "./findOneOrCreate";
import { save } from "./save";
import { findAll } from "./findAll";
export function manager(_a) {
    var db = _a.db, collectionId = _a.collectionId, collectionPathFn = _a.collectionPathFn, _default = _a._default, _b = _a.options, options = _b === void 0 ? { debug: false } : _b;
    var manager = {
        new: _new(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId, _default, options),
        find: find(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId),
        delete: _delete(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId),
        create: create(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId, _default, options),
        save: save(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId),
        findById: findById(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId),
        findOne: findOne(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId),
        findOneAndUpdate: findOneAndUpdate(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId),
        findOneOrCreate: findOneOrCreate(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId, _default),
        update: update(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId),
        deleteMany: deleteMany(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId),
    };
    if (collectionPathFn) {
        return __assign(__assign({}, manager), { findAll: findAll(db, collectionId) });
    }
    return manager;
}

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
export function manager({ db, collectionId, collectionPathFn, _default, options = { debug: false }, }) {
    const manager = {
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
        return Object.assign(Object.assign({}, manager), { findAll: findAll(db, collectionId) });
    }
    return manager;
}

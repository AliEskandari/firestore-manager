"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manager = void 0;
const find_1 = require("./find");
const new_1 = require("./new");
const delete_1 = require("./delete");
const create_1 = require("./create");
const findById_1 = require("./findById");
const findOne_1 = require("./findOne");
const findOneAndUpdate_1 = require("./findOneAndUpdate");
const update_1 = require("./update");
const deleteMany_1 = require("./deleteMany");
const findOneOrCreate_1 = require("./findOneOrCreate");
const save_1 = require("./save");
const findAll_1 = require("./findAll");
function manager({ db, collectionId, collectionPathFn, _default, options = { debug: false }, }) {
    const manager = {
        new: (0, new_1._new)(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId, _default, options),
        find: (0, find_1.find)(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId),
        delete: (0, delete_1._delete)(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId),
        create: (0, create_1.create)(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId, _default, options),
        save: (0, save_1.save)(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId),
        findById: (0, findById_1.findById)(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId),
        findOne: (0, findOne_1.findOne)(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId),
        findOneAndUpdate: (0, findOneAndUpdate_1.findOneAndUpdate)(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId),
        findOneOrCreate: (0, findOneOrCreate_1.findOneOrCreate)(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId, _default),
        update: (0, update_1.update)(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId),
        deleteMany: (0, deleteMany_1.deleteMany)(db, collectionPathFn !== null && collectionPathFn !== void 0 ? collectionPathFn : collectionId),
    };
    if (collectionPathFn) {
        return Object.assign(Object.assign({}, manager), { findAll: (0, findAll_1.findAll)(db, collectionId) });
    }
    return manager;
}
exports.manager = manager;

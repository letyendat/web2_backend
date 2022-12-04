import groupUserRoleModel from "../models/group_user_role.model.js";

async function findManyUserRole(filter, populate) {
    return await groupUserRoleModel.find(filter).populate(populate).exec();
}

async function findOne(filter) {
    return await groupUserRoleModel.findOne(filter).exec();
}

async function create(admin) {
    return await groupUserRoleModel.create(admin);
}

async function findOneAndUpdate(filter, dataUpdate) {
    return await groupUserRoleModel.findOneAndUpdate(filter, dataUpdate).exec();
}

async function deleteOne(filter) {
    return await groupUserRoleModel.deleteOne(filter).exec();
}
export default {
    findManyUserRole,
    findOne,
    create,
    findOneAndUpdate,
    deleteOne
}
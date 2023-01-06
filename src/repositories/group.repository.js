import groupModel from "../models/group.model.js";

async function create(customer) {
    return await groupModel.create(customer);
}

async function findOne(filter) {
    return await groupModel.findOne(filter).exec();
}

async function findOneAndUpdate(filter, dataUpdate) {
    return await groupModel.findOneAndUpdate(filter, dataUpdate).exec();
}

async function deleteOne(filter) {
    return await groupModel.deleteOne(filter).exec();
}

export default {
    create,
    findOne,
    findOneAndUpdate,
    deleteOne,
}
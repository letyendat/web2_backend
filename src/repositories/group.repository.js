import groupModel from "../models/group.model";

async function create(customer) {
    return await groupModel.create(customer);
}

async function findOne(filter) {
    return await groupModel.findOne(filter).exec();
}

async function findOneAndUpdate(filter, dataUpdate) {
    return await groupModel.findOneAndUpdate(filter, dataUpdate).exec();
}

export default {
    create,
    findOne,
    findOneAndUpdate,
}
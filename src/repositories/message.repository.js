import messageModel from "../models/message.model.js";

async function create(data) {
    return await messageModel.create(data);
}

async function findOne(filter, populate) {
    return await messageModel.findOne(filter).populate(populate).exec();
}

async function findMany(filter, populate) {
    return await messageModel.find(filter).populate(populate).exec();
}

// async function findOneAndUpdate(filter, dataUpdate) {
//     return await messageModel.findOneAndUpdate(filter, dataUpdate, {new: true}).exec();
// }

// async function deleteOne(filter) {
//     return await messageModel.deleteOne(filter).exec();
// }

export default {
    create,
    findMany,
    findOne
}
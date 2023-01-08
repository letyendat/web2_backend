import slideHeadingModel from "../models/slideHeading.model.js";

async function create(data) {
    return await slideHeadingModel.create(data);
}

async function findOne(filter) {
    return await slideHeadingModel.findOne(filter).exec();
}

async function findMany(filter) {
    return await slideHeadingModel.find(filter).exec();
}

async function findOneAndUpdate(filter, dataUpdate) {
    return await slideHeadingModel.findOneAndUpdate(filter, dataUpdate, {new: true}).exec();
}

async function deleteOne(filter) {
    return await slideHeadingModel.deleteOne(filter).exec();
}

export default {
    create,
    findOne,
    findMany,
    findOneAndUpdate,
    deleteOne
}
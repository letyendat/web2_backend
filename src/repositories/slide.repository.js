import slideModel from "../models/slide.model.js";

async function create(data) {
    return await slideModel.create(data);
}

async function findOne(filter) {
    return await slideModel.findOne(filter).exec();
}

async function findMany(filter) {
    return await slideModel.find(filter).exec();
}

async function findOneAndUpdate(filter, dataUpdate) {
    return await slideModel.findOneAndUpdate(filter, dataUpdate, {new: true}).exec();
}

async function deleteOne(filter) {
    return await slideModel.deleteOne(filter).exec();
}

export default {
    create,
    findOne,
    findMany,
    findOneAndUpdate,
    deleteOne
}
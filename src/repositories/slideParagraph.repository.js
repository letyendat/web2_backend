import slideParagraphModel from "../models/slideParagraph.model.js";

async function create(data) {
    return await slideParagraphModel.create(data);
}

async function findOne(filter) {
    return await slideParagraphModel.findOne(filter).exec();
}

async function findMany(filter) {
    return await slideParagraphModel.find(filter).exec();
}

async function findOneAndUpdate(filter, dataUpdate) {
    return await slideParagraphModel.findOneAndUpdate(filter, dataUpdate, {new: true}).exec();
}

async function deleteOne(filter) {
    return await slideParagraphModel.deleteOne(filter).exec();
}

export default {
    create,
    findOne,
    findMany,
    findOneAndUpdate,
    deleteOne
}
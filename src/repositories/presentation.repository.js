import presentationModel from "../models/presentation.model.js";

async function create(customer) {
    return await presentationModel.create(customer);
}

async function findOne(filter) {
    return await presentationModel.findOne(filter).exec();
}

async function findMany(filter) {
    return await presentationModel.find(filter).exec();
}

async function findOneAndUpdate(filter, dataUpdate) {
    return await presentationModel.findOneAndUpdate(filter, dataUpdate).exec();
}

async function deleteOne(filter) {
    return await presentationModel.deleteOne(filter).exec();
}

export default {
    create,
    findOne,
    findMany,
    findOneAndUpdate,
    deleteOne
}
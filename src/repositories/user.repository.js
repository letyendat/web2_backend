import userModel from "../models/user.model";

async function findMany(filter) {
    return await userModel.find(filter).exec();
}

async function findOne(filter) {
    return await userModel.findOne(filter).exec();
}
async function findOneWithnoPassword(filter) {
    return await userModel.findOne(filter)
        .select('-password')
        .exec();
}
async function findOneAndUpdate(filter, data) {
    return await userModel.findOneAndUpdate(filter, data, {
        new: true
    })
}
async function create(admin) {
    return await userModel.create(admin);
}

export default {
    findMany,
    findOne,
    findOneWithnoPassword,
    create,
    findOneAndUpdate
}
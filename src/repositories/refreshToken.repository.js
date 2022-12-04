import refreshTokenModel from "../models/refreshToken.model.js";

async function create(token) {
    return await refreshTokenModel.create(token);
}
async function findOne(filter) {
    return await refreshTokenModel.findOne(filter).exec();
}
async function updateOne(filter, update) {
    return await refreshTokenModel.findOneAndUpdate(filter, update);
}
export default {
    create,
    findOne,
    updateOne
}
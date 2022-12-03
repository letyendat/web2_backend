import roleModel from "../models/role.model";

async function create(customer) {
    return await roleModel.create(customer);
}

async function findOne(filter) {
    return await roleModel.findOne(filter).exec();
}

async function findOneAndUpdate(filter, dataUpdate) {
    return await roleModel.findOneAndUpdate(filter, dataUpdate).exec();
}

export default {
    create,
    findOne,
    findOneAndUpdate,
}
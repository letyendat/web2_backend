
import roleRepository from '../repositories/role.repository';
async function create(createModel) {
    try {
        const role = await roleRepository.create({ ...createModel });
        if (!role) {
            return { status: false, message: 'Can not create Role' };
        }
        return {
            status: true, data: role
        }

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}
export default {
    create
};
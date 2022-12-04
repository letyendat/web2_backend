import presentationRepository from '../repositories/presentation.repository.js';
import userRepository from '../repositories/user.repository.js';

async function create(createModel) {
    try {
        const presentation = await presentationRepository.create({ ...createModel });
        if (!presentation) {
            return { status: false, message: 'Can not create presentation' };
        }
       
        return {
            status: true, data: presentation
        }

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

async function getPresentations(user_id) {
    try {
        const presentations = await presentationRepository.findMany({ user_id })
        if (!presentations) {
            return {
                status: false,
                message: 'Presentations not found'
            }
        }
        return {
            status: true,
            data: presentations
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

async function getOne(id) {
    try {
        const presentation = await presentationRepository.findOne({ _id: id });
        if (!presentation) return {
            status: false, data: "cant get Presentation"
        }
        return {
            status: true, data: presentation
        }
    } catch (error) {
        return { status: false, message: error.message };
    }
}

async function deleteOne(id) {
    try {
        const group = await presentationRepository.deleteOne({
            _id: id
        })
        if (!group) {
            return {
                status: false,
                message: 'You cannot delete'
            }
        }
        return {
            status: true,
            data: "Delete successful!"
        }

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}



export default {
    create,
    getPresentations,
    getOne,
    deleteOne,
};
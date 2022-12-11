import messageRepository from '../repositories/message.repository.js';

async function create(createModel) {
    try {
        const message = await messageRepository.create({ ...createModel });
        if (!message) {
            return { status: false, message: 'Can not create message' };
        }

        return {
            status: true, data: message
        }

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

async function getMessages(presentation_id) {
    try {
        const messages = await messageRepository.findMany({ presentation_id: presentation_id },
            [ { path: 'owner_id', select: { _id: 1, name: 1 } }])
        if (!messages) {
            return {
                status: false,
                message: 'messages not found'
            }
        }
        return {
            status: true,
            data: messages
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
        const message = await messageRepository.findOne({ _id: id }, [ { path: 'owner_id', select: { _id: 1, name: 1 } }]);
        if (!message) return {
            status: false, data: "cant get message"
        }
        return {
            status: true, data: message
        }
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export default {
    create,
    getMessages,
    getOne,
};
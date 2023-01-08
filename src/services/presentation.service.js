import presentationRepository from '../repositories/presentation.repository.js';
import slideService from './slide.service.js';
import slideHeadingService from './slideHeading.service.js';
import slideParagraphService from './slideParagraph.service.js';

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
        let presentation = await presentationRepository.findOne({ _id: id });
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

async function getSlidesOfPresentation(id) {
    try {
        let presentation = await presentationRepository.findOne({ _id: id });
        if (!presentation) return {
            status: false, data: "cant get Presentation"
        }

        let slide_list_object = [];
        const slide_list = presentation.slide_list;

        for (let i = 0; i < slide_list.length; i++) {
            if (slide_list[i].id_type === 1) {
                const slide = await slideService.getOne(slide_list[i].id);
                slide_list_object.push(slide.data);
            } else if (slide_list[i].id_type === 2) {
                const slide = await slideHeadingService.getOne(slide_list[i].id);
                slide_list_object.push(slide.data);
            } else if (slide_list[i].id_type === 3) {
                const slide = await slideParagraphService.getOne(slide_list[i].id);
                slide_list_object.push(slide.data);
            }
        }

        return {
            status: true, data: slide_list_object
        }
    } catch (error) {
        return { status: false, message: error.message };
    }
}

async function getSlidesByCode(code) {
    try {
        const presentation = await presentationRepository.findOne({ code: code });

        const slides = await getSlidesOfPresentation(presentation._id);
        if (!slides) return {
            status: false, data: "cant get Slides by code"
        }
        return {
            status: true, data: slides.data
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
    getSlidesOfPresentation,
    getSlidesByCode
};
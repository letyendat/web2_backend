import presentationRepository from '../repositories/presentation.repository.js';
import slideHeadingRepository from '../repositories/slideHeading.repository.js';
// import io from '../../index.js';

async function create(createModel) {
    try {
        createModel.slide_type = 2;
        const slide = await slideHeadingRepository.create({ ...createModel });
        if (!slide) {
            return { status: false, message: 'Can not create slide' };
        }

        const presentation = await presentationRepository.findOne({ _id: createModel.presentation_id });
        if (!presentation) {
            return { status: false, message: 'Can not create slide' };
        }
        let slide_list = presentation.slide_list;
        let object_slide_id = {
            id: slide._id,
            id_type: 2
        };
        slide_list.push(object_slide_id);

        const presentation_update = await presentationRepository.findOneAndUpdate({_id: createModel.presentation_id}, { $set: { slide_list: slide_list } });
        if (!presentation_update) {
            return { status: false, message: 'Can not create slide' };
        }

        return {
            status: true, data: slide
        }

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

async function update(id, data) {
    try {
        const slide = await slideHeadingRepository.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    heading: data.heading,
                }
            });

        if (!slide) {
            return { status: false, message: 'Can not update slide' };
        }

        return {
            status: true, data: slide
        }

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

async function getSlides(presentation_id) {
    try {
        const slides = await slideHeadingRepository.findMany({ presentation_id: presentation_id })
        if (!slides) {
            return {
                status: false,
                message: 'slides not found'
            }
        }
        return {
            status: true,
            data: slides
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
        const slide = await slideHeadingRepository.findOne({ _id: id });
        if (!slide) return {
            status: false, data: "cant get Slide"
        }
        return {
            status: true, data: slide
        }
    } catch (error) {
        return { status: false, message: error.message };
    }
}

async function getSlidesByCode(code) {
    try {
        const presentation = await presentationRepository.findOne({ code: code });

        const slides = await getSlides(presentation);
        if (!slides) return {
            status: false, data: "cant get Slides by code"
        }
        return {
            status: true, data: slides
        }
    } catch (error) {
        return { status: false, message: error.message };
    }
}

// async function updateOption(id, index) {
//     try {
//         let slideOld = await slideHeadingRepository.findOne({ _id: id });
//         slideOld.datas[index]++;
//         const datas = slideOld.datas;

//         const slide = await slideRepository.findOneAndUpdate(
//             { _id: id },
//             {
//                 $set: {
//                     datas: datas,
//                 }
//             });

//         if (!slide) {
//             return { status: false, message: 'Can not update slide' };
//         }

//         return {
//             status: true, data: slide
//         }

//     } catch (error) {
//         return {
//             status: false,
//             message: error.message
//         }
//     }
// }

async function deleteOne(id) {
    try {
        const group = await slideHeadingRepository.deleteOne({
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
    update,
    getSlides,
    getOne,
    getSlidesByCode,
    // updateOption,
    deleteOne
};
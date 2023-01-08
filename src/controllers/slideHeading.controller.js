import slideHeadingService from '../services/slideHeading.service.js';

async function create(req, res) {
  try {
    const slide = await slideHeadingService.create(req.body);
    res.json(slide);
  } catch (err) {
    res.json({ status: false, message: err.message })
  }
};

async function update(req, res) {
  const data = {
    heading: req.body.heading
  }
    try {
        const result = await slideHeadingService.update(req.body.id, data)
        if (!result) {
            res.json({ status: false, message: ' Cannot update slide' })
        }
        res.json(result)
    } catch (error) {
        res.json({ status: false, error: error.message });
    }
}

async function getSlides(req, res) {
  try {
    const slides = await slideHeadingService.getSlides(req.query.presentation_id);
    res.json(slides);
  } catch (err) {
    res.json({ status: false, message: err.message })
  }
}

async function getOne(req, res) {
  try {
    const slide = await slideHeadingService.getOne(req.query._id)
  
    res.json({ status: true, data: slide })
  } catch (error) {
    res.json({ status: false, error: error.message });
  }
}

async function getSlidesByCode(req, res) {
  try {
    const slides = await slideHeadingService.getSlidesByCode(req.query.code);
    res.json(slides);
  } catch (err) {
    res.json({ status: false, message: err.message })
  }
}

async function deleteOne(req, res) {
  try {
    const slide = await slideHeadingService.deleteOne(req.body._id);
    res.json(slide);
  } catch (err) {
    res.json({ status: false, message: err.message })
  }
}

export default {
  create,
  update,
  getSlides,
  getOne,
  getSlidesByCode,
  deleteOne
}
import slideService from '../services/slide.service.js';
import userService from '../services/user.service.js';

async function create(req, res) {
  try {
    const slide = await slideService.create(req.body);
    res.json(slide);
  } catch (err) {
    res.json({ status: false, message: err.message })
  }
};

async function update(req, res) {
  const data = {
    question: req.body.question,
    labels: req.body.labels,
    datas: req.body.datas,
  }
    try {
        const result = await slideService.update(req.body.id, data)
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
    const slides = await slideService.getSlides(req.query.presentation_id);
    res.json(slides);
  } catch (err) {
    res.json({ status: false, message: err.message })
  }
}

async function getOne(req, res) {
  try {
    const slide = await slideService.getOne(req.query._id)
  
    res.json({ status: true, data: slide })
  } catch (error) {
    res.json({ status: false, error: error.message });
  }
}

async function getSlidesByCode(req, res) {
  try {
    const slides = await slideService.getSlidesByCode(req.query.code);
    res.json(slides);
  } catch (err) {
    res.json({ status: false, message: err.message })
  }
}

async function updateOption(req, res) {
    try {
        const result = await slideService.updateOption(req.body.id, req.body.index)
        if (!result) {
            res.json({ status: false, message: ' Cannot update slide' })
        }
        res.json(result)
    } catch (error) {
        res.json({ status: false, error: error.message });
    }
}

async function deleteOne(req, res) {
  try {
    const slide = await slideService.deleteOne(req.body._id);
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
  updateOption,
  deleteOne
}
import presentationService from '../services/presentation.service.js';
import userService from '../services/user.service.js';

async function create(req, res) {
  const user = await userService.getUserOne(req.id);
  const body = {
    owner_id: req.id,
    ...req.body
  }
  try {
    const presentation = await presentationService.create(body);
    res.json(presentation);
  } catch (err) {
    res.json({ status: false, message: err.message })
  }
};

async function getPresentations(req, res) {
  try {
    const presentation = await presentationService.getPresentations(req.id);
    res.json(presentation);
  } catch (err) {
    res.json({ status: false, message: err.message })
  }
}

async function getOne(req, res) {
  try {
    const presentation = await presentationService.getOne(req.query._id)
  
    res.json({ status: true, data: presentation })
  } catch (error) {
    res.json({ status: false, error: error.message });
  }
}

async function getSlidesOfPresentation(req, res) {
  try {
    const presentation = await presentationService.getSlidesOfPresentation(req.query._id)
  
    res.json({ status: true, data: presentation })
  } catch (error) {
    res.json({ status: false, error: error.message });
  }
}

async function getSlidesByCode(req, res) {
  try {
    const presentation = await presentationService.getSlidesByCode(req.query.code)
  
    res.json({ status: true, data: presentation })
  } catch (error) {
    res.json({ status: false, error: error.message });
  }
}

async function deleteOne(req, res) {
  try {
    const presentation = await presentationService.deleteOne(req.body._id);
    res.json(presentation);
  } catch (err) {
    res.json({ status: false, message: err.message })
  }
}

export default {
  create,
  getPresentations,
  getOne,
  deleteOne,
  getSlidesOfPresentation,
  getSlidesByCode
}
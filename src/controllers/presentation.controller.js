import presentationService from '../services/presentation.service';
import userService from '../services/user.service';

async function create(req, res) {
  const user = await userService.getUserOne(req.id);
  const body = {
    owner_id: req.id,
    ...req.body
  }
  try {
    const group = await presentationService.create(body);
    res.json(group);
  } catch (err) {
    res.json({ status: false, message: error.message })
  }
};

async function getPresentations(req, res) {
  try {
    const presentation = await presentationService.getPresentations(req.id);
    res.json(presentatioi);
  } catch (err) {
    res.json({ status: false, message: error.message })
  }
}

async function getOne(req, res) {
  try {
    const presentation = await groupService.getOne(req.query._id)
  
    res.json({ status: true, data: presentation })
  } catch (error) {
    res.json({ status: false, error: error.message });
  }
}

export default {
  create,
  getPresentations,
  getOne,
}
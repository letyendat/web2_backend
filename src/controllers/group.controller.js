import groupService from '../services/group.service.js';
import userService from '../services/user.service.js';

async function create(req, res) {
  const user = await userService.getUserOne(req.id);
  const body = {
    owner_id: req.id,
    owner_name: user.name,
    ...req.body
  }
  try {
    const group = await groupService.create(body, req.id);
    res.json(group);
  } catch (err) {
    res.json({ status: false, message: error.message })
  }
};
async function joinGroup(req, res) {
  try {
    const joinGroup = await groupService.joinGroup(req.query.group_id, req.id);
    res.json(joinGroup);
  } catch (err) {
    res.json({ status: false, message: error.message })
  }
}
async function sendInvitationLink(req, res) {
  try {
    const link = await groupService.sendLink(req.query.group_id, req.query.email, req.id);
    res.json(link);
  } catch (err) {
    res.json({ status: false, message: error.message })
  }
}

async function createInvitationLink(req, res) {
  try {
    const link = await groupService.createLink(req.query.group_id, req.id);
    res.json(link);
  } catch (err) {
    res.json({ status: false, message: error.message })
  }
}
async function getGroups(req, res) {
  try {
    const groups = await groupService.getGroups(req.id);
    res.json(groups);
  } catch (err) {
    res.json({ status: false, message: error.message })
  }
}

async function getOne(req, res) {
  try {
    const result = await groupService.getOne(req.query._id)
    const groups = await groupService.getDataOfGroup(req.query._id);
    if (!result) {
      res.json({ status: false, message: ' Cannot get group' })
    }
    res.json({ status: true, group: result, data: groups })
  } catch (error) {
    res.json({ status: false, error: error.message });
  }
}

async function getAllMembers(req, res) {
  try {
    const groups = await groupService.getAllMembers(req.query.group_id);
    res.json(groups);
  } catch (err) {
    res.json({ status: false, message: error.message })
  }
}
async function deleteMember(req, res) {
  try {
    const groups = await groupService.deleteOneMember(req.id, req.body.group_id, req.body.user_id_delete);
    res.json({ status: true, message: "Delete successfull" });
  } catch (err) {
    res.json({ status: false, message: error.message })
  }
}

async function deleteGroup(req, res) {
  try {
    const groups = await groupService.deleteOneGroup(req.id, req.body.group_id);
    res.json({ status: true, message: "Delete successfull" });
  } catch (err) {
    res.json({ status: false, message: error.message })
  }
}

async function updateRole(req, res) {
  try {
    const role = await groupService.updateRole(req.id, req.body.group_id, req.body.user_id_update, req.body.role);
    res.json(role);
  } catch (err) {
    res.json({ status: false, message: error.message })
  }
};
export default {
  create,
  joinGroup,
  getGroups,
  sendInvitationLink,
  createInvitationLink,
  getOne,
  getAllMembers,
  deleteMember,
  deleteGroup,
  updateRole
}
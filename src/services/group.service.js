
import { STATUS } from '../constants/data.js';
import { ROLES } from '../constants/roles.js';
import groupRepository from '../repositories/group.repository.js';
import groupUserRoleRepository from '../repositories/groupUserRole.repository.js';
import roleRepository from '../repositories/role.repository.js';
import userRepository from '../repositories/user.repository.js';
import { sendEmail } from '../utils/mail.js';
async function create(createModel, user_id) {
    try {
        const group = await groupRepository.create({ ...createModel });
        if (!group) {
            return { status: false, message: 'Can not create Group' };
        }
        const role_owner = await roleRepository.findOne({ name: ROLES.OWNER });
        const group_user_role = await groupUserRoleRepository.create({
            user_id, group_id: group._id, role_id: role_owner._id
        })
        if (!group_user_role) {
            return { status: false, message: 'Can not create Group' };
        }
        return {
            status: true, data: group
        }

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}
async function joinGroup(group, user_id) {
    try {
        const user = await userRepository.findOne({ _id: user_id, status: STATUS.ACTIVE });
        if (!user) {
            return {
                status: false,
                message: 'User not found'
            }
        }
        const groups = await groupRepository.findOne({ _id: group });
        if (!groups) {
            return {
                status: false,
                message: 'Group not found'
            }
        }
        const role = await roleRepository.findOne({ name: ROLES.MEMBER });
        const data = { user_id: user._id, group_id: group, role_id: role._id }
        const group_user_role = await groupUserRoleRepository.findOne(data);
        if (group_user_role) {
            return {
                status: false,
                message: 'User was joined Group'
            }
        }
        const joinGroup = await groupUserRoleRepository.create(data)
        if (!joinGroup) {
            return {
                status: false,
                message: 'Can not join group'
            }
        }
        return {
            status: true,
            data: joinGroup
        }


    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

async function getGroups(user_id) {
    try {
        const groups = await groupUserRoleRepository.findManyUserRole({ user_id },
            [{ path: 'group_id', select: { id: 1, name: 1, description: 1, owner_id: 1, owner_name: 1 } },
            { path: 'user_id', select: { _id: 1, name: 1, email: 1 } },
            { path: 'role_id', select: { _id: 0, name: 1 } }])
        if (!groups) {
            return {
                status: false,
                message: 'Groups not found'
            }
        }
        return {
            status: true,
            data: groups
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

async function sendLink(group_id, email, user_id) {
    try {
        const group = await groupUserRoleRepository.findOne({
            group_id, user_id
        })
        if (!group) {
            return {
                status: false,
                message: 'You can not create link Invitation'
            }
        }
        const user = await userRepository.findOne({
            email
        })
        if (!user) {
            return {
                status: false,
                message: 'Email of User is invited not exist'

            }
        }

        const mailOptions = {
            from: process.env.EMAIL,
            to: `${email}`,
            subject: 'Invitation Group',
            text: `https://web2-frontend-l6ij.vercel.app/invite/${group_id}`
        };
        await sendEmail(mailOptions);
        return {
            status: true,
            data: mailOptions
        }

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

async function createLink(group_id, user_id) {
    try {
        const group = await groupUserRoleRepository.findOne({
            group_id, user_id
        })
        if (!group) {
            return {
                status: false,
                message: 'You can not create link Invitation'
            }
        }
        const link = `https://web2-frontend-l6ij.vercel.app/invite/${group_id}`
        return {
            status: true,
            data: link
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
        const group = await groupRepository.findOne({ _id: id });
        if (!group) return {
            status: false, data: "cant get Group"
        }
        return {
            status: true, data: group
        }
    } catch (error) {
        return { status: false, message: error.message };
    }
}

async function getAllMembers(group_id) {
    try {
        const groups = await groupUserRoleRepository.findManyUserRole({ group_id },
            [{ path: 'user_id', select: { _id: 1, name: 1, email: 1 } },
            { path: 'role_id', select: { _id: 0, name: 1 } }])
        if (!groups) {
            return {
                status: false,
                message: 'Groups members not found'
            }
        }
        return {
            status: true,
            data: groups
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

async function getDataOfGroup(group_id) {
    try {
        const groups = await groupUserRoleRepository.findManyUserRole({ group_id },
            [{ path: 'user_id', select: { _id: 1, name: 1, email: 1 } },
            { path: 'role_id', select: { _id: 0, name: 1 } }])
        if (!groups) {
            return 'Groups members not found'
        }
        return groups
    } catch (error) {
        return error.message
    }
}

async function deleteOneMember(user_id, group_id, user_id_delete) {
    try {
        const group = await groupRepository.findOne({ _id: group_id });
        if (!group) {
            return 'Group not found';
        }

        if (group.owner_id != user_id) {
            return 'User no onwer group';
        }

        console.log(user_id_delete, group_id)
        const resp = await groupUserRoleRepository.deleteOne({
            user_id: user_id_delete, group_id: group_id
        })
        if (!resp) {
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

async function deleteOneGroup(user_id, group_id) {
    try {
        const group = await groupRepository.findOne({ _id: group_id });
        if (!group) {
            return 'Group not found';
        }

        if (group.owner_id != user_id) {
            return 'User no onwer group';
        }

        const members = await getAllMembers(group_id);
        if (!members) {
            return 'Group not found';
        }

        for (let i = 0; i < members.data.length; i++) {
            const resp = await deleteOneMember(user_id, group_id, members.data[i].user_id._id);
        }

        const resp = await groupRepository.deleteOne({
            _id: group_id
        })
        if (!resp) {
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
    joinGroup,
    getGroups,
    sendLink,
    createLink,
    getOne,
    getAllMembers,
    deleteOneMember,
    getDataOfGroup,
    deleteOneGroup
};
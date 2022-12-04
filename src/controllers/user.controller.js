import userService from '../services/user.service.js'

async function login(req, res) {
    try {
        const result = await userService.login(req.body);
        res.json(result);
    } catch (error) {
        res.json({ status: false, message: error.message })
    }

}
async function register(req, res) {
    try {
        const result = await userService.createAccount(req.body);
        res.json(result);
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
}
async function verifyAccount(req, res) {
    try {
        const result = await userService.verifyAccount(req.query._id);
        res.json(result);
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
}
async function refreshToken(req, res) {
    const { refreshToken } = req.body;
    try {
        const result = await userService.refreshToken(refreshToken);
        if (!result) {
            res.json({ status: false, message: ' Can not refresh Token' })
        }
        res.json(result);
    } catch (error) {
        res.json({ status: false, error: error.message });
    }
}

async function getOne(req, res) {
    const { _id } = req.body;
    try {
        const result = await userService.getOne(_id)
        if (!result) {
            res.json({ status: false, message: ' Cannot get user' })
        }
        res.json(result)
    } catch (error) {
        res.json({ status: false, error: error.message });
    }
}
async function getCurrent(req, res) {
    try {
        const result = await userService.getOne(req.id)
        if (!result) {
            res.json({ status: false, message: ' Cannot get current user' })
        }
        res.json(result)
    } catch (error) {
        res.json({ status: false, error: error.message });
    }
}

async function updateUser(req, res) {
    const { name } = req.body;
    try {
        const result = await userService.updateUser(req.id, name)
        if (!result) {
            res.json({ status: false, message: ' Cannot update user' })
        }
        res.json(result)
    } catch (error) {
        res.json({ status: false, error: error.message });
    }
}
export default {
    verifyAccount,
    login,
    register,
    refreshToken,
    getOne,
    getCurrent,
    updateUser
}
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { hashUser, verifyUser } from '../utils/jwt.js'
import { refresh_Token, JWT } from '../utils/auth.js'
import UserRepository from '../repositories/user.repository.js'
import RefreshTokenRepository from '../repositories/refreshToken.repository.js'
import { STATUS } from '../constants/data.js';
import { sendEmail } from '../utils/mail.js';
async function login(body) {
    try {
        const { password, email } = body
        const user = await UserRepository.findOne({ email, status: STATUS.ACTIVE });
        if (!user) {
            return { status: false, message: 'Invalid username or password' };
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return {
                status: false,
                message: 'Email or password is incorrect',
            };
        }
        const token = JWT(user);
        const refreshToken = refresh_Token(user);
        const check_session = await RefreshTokenRepository.findOne({ userId: user._id });
        const session = {
            userId: user._id,
            refreshToken,
        };
        if (!check_session) {

            const refresh = await RefreshTokenRepository.create(session);
            if (!refresh) {
                return {
                    status: false,
                    message: ' Can not create RefreshToken'
                }
            }
        }
        const refresh_token_update = await RefreshTokenRepository.updateOne({ userId: user._id }, session);
        if (!refresh_token_update) {
            return {
                status: false,
                message: ' Can not update RefreshToken'
            }
        }

        const userreturn = await UserRepository.findOneWithnoPassword({ email, status: STATUS.ACTIVE });
        return {
            status: true,
            data: {
                token: token,
                refreshToken,
                user: userreturn,

            }
        };

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}
async function createAccount(body) {
    try {
        const { password, email } = body;
        const user = await UserRepository.findOne({ email, status: STATUS.ACTIVE });
        if (user) {
            return { status: false, message: ' User is exist' }
        }
        const hashPassword = await bcrypt.hash(password, 10);
        body.password = hashPassword;
        const newUser = await UserRepository.create(body);
        if (!newUser) {
            return { status: false, message: ' Can not create Account' }
        }
        const hash_id = await hashUser(newUser._id)
        const mailOptions = {
            from: process.env.EMAIL,
            to: `${email}`,
            subject: 'Verify Account Web',
            text: `https://web2-backend-8wpp.onrender.com/user/verify?_id=${hash_id}`
        };
        await sendEmail(mailOptions);
        return {
            status: true, data: newUser
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}
async function verifyAccount(hash_id) {
    try {
        const user = await verifyUser(hash_id);
        const updateUser = await UserRepository.findOneAndUpdate({ _id: user.id }, { $set: { status: STATUS.ACTIVE } });
        if (!updateUser) {
            return { status: false, message: 'User does not exist' }
        }
        return {
            status: true, data: updateUser
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}
async function refreshToken(refresh) {
    try {
        if (!refresh) {
            return { status: false, message: 'refresh token is  undefined' }
        }
        const session =
            await RefreshTokenRepository.findOne({ refreshToken: refresh });
        if (!session) {
            return { status: false, message: ' refresh Token not found' };
        }
        const user = await jwt.verify(
            refresh,
            process.env.JWT_TOKEN_SECRET || ''
        );
        const token = JWT(user);
        const new_token = refresh_Token(user);
        await RefreshTokenRepository.updateOne({ refreshToken: refresh }, { refreshToken: new_token });
        return {
            status: true, data: {
                refreshToken: new_token, token: token
            }
        };
    } catch (error) {
        return { status: false, message: error.message };
    }
}
async function getOne(id) {
    try {
        const user = await UserRepository.findOne({ _id: id });
        if (!user) return {
            status: false, data: "cant get user"
        }
        return {
            status: true, data: user
        }
    } catch (error) {
        return { status: false, message: error.message };
    }
}

async function getUserOne(id) {
    try {
        const user = await UserRepository.findOne({ _id: id });
        if (!user) return "cant get user"
        return user
    } catch (error) {
        return error.message;
    }
}

async function updateUser(id, name) {
    try {
        const user = await UserRepository.findOneAndUpdate({ _id: id }, { $set: { name: name } });
        if (!user) return {
            status: false, data: "cant update user"
        }
        return {
            status: true, data: user
        }
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export default {
    verifyAccount,
    refreshToken,
    login,
    createAccount,
    getOne,
    updateUser,
    getUserOne
};
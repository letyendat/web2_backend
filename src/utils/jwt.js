import jwt from 'jsonwebtoken';
const token_secret = process.env.JWT_TOKEN_SECRET || '';
async function hashUser(id) {
    const token = await jwt.sign(
        {
            id
        },
        token_secret,
        { expiresIn: '1h' }
    );
    return token;
}
async function verifyUser(token) {
    return await jwt.verify(token, token_secret);
}
export { verifyUser, hashUser }
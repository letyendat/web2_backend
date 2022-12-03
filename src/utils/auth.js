import jwt from 'jsonwebtoken';
const token_secret = process.env.JWT_TOKEN_SECRET || '';
function JWT(user) {
    const token = jwt.sign(
        {
            id: user.id,
        },
        token_secret,
        { expiresIn: '2h' }
    );
    return token;
}
function refresh_Token(user) {
    const token = jwt.sign(
        {
            _id: user._id,
            userType: user.userType,
            refreshToken: 1,
        },
        token_secret
    );
    return token;
};
export { refresh_Token, JWT }
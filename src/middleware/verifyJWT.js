import jwt from 'jsonwebtoken';

const verifyJWT = () => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.JWT_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403); //invalid token
                req.id = decoded.id;
                next();
            }
        );
    }
}

export default verifyJWT
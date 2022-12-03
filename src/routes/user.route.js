import { Router } from 'express';
import verifyJWT from '../middleware/verifyJWT'

const router = Router();
import userController from '../controllers/user.controller';
router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/refreshToken', userController.refreshToken);
router.get('/verify', userController.verifyAccount)
router.get('/getone', verifyJWT(), userController.getOne);
router.get('/getcurrent', verifyJWT(), userController.getCurrent);
router.post('/', verifyJWT(), userController.updateUser);

export default router;

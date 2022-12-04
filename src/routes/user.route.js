import { Router } from 'express';
import verifyJWT from '../middleware/verifyJWT.js'

const router = Router();
import userController from '../controllers/user.controller.js';
router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/refreshToken', userController.refreshToken);
router.get('/verify', userController.verifyAccount)
router.get('/getone', verifyJWT(), userController.getOne);
router.get('/getcurrent', verifyJWT(), userController.getCurrent);
router.post('/', verifyJWT(), userController.updateUser);

export default router;

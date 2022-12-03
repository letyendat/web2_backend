import { Router } from 'express';
import verifyJWT from '../middleware/verifyJWT'
const router = Router();
import presentationController from '../controllers/presentation.controller';
router.post('/create', verifyJWT(), presentationController.create);
router.get('/', verifyJWT(), presentationController.getPresentations);
router.get('/getone', verifyJWT(), presentationController.getOne);


export default router;

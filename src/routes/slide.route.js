import { Router } from 'express';
import verifyJWT from '../middleware/verifyJWT.js'
const router = Router();
import slideController from '../controllers/slide.controller.js';
router.post('/create', verifyJWT(), slideController.create);
router.post('/update', verifyJWT(), slideController.update);
router.post('/update_option', verifyJWT(), slideController.updateOption);
router.get('/', verifyJWT(), slideController.getSlides);
router.get('/getone', verifyJWT(), slideController.getOne);
router.get('/get_slide_by_code', verifyJWT(), slideController.getSlidesByCode);
router.post('/delete', verifyJWT(), slideController.deleteOne);

export default router;

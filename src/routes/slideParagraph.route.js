import { Router } from 'express';
import verifyJWT from '../middleware/verifyJWT.js'
const router = Router();
import slideParagraphController from '../controllers/slideParagraph.controller.js';
router.post('/create', verifyJWT(), slideParagraphController.create);
router.post('/update', verifyJWT(), slideParagraphController.update);
router.get('/', verifyJWT(), slideParagraphController.getSlides);
router.get('/getone', verifyJWT(), slideParagraphController.getOne);
router.get('/get_slide_by_code', verifyJWT(), slideParagraphController.getSlidesByCode);
router.post('/delete', verifyJWT(), slideParagraphController.deleteOne);

export default router;

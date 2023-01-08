import { Router } from 'express';
import verifyJWT from '../middleware/verifyJWT.js'
const router = Router();
import slideHeadingController from '../controllers/slideHeading.controller.js';
router.post('/create', verifyJWT(), slideHeadingController.create);
router.post('/update', verifyJWT(), slideHeadingController.update);
router.get('/', verifyJWT(), slideHeadingController.getSlides);
router.get('/getone', verifyJWT(), slideHeadingController.getOne);
router.get('/get_slide_by_code', verifyJWT(), slideHeadingController.getSlidesByCode);
router.post('/delete', verifyJWT(), slideHeadingController.deleteOne);

export default router;

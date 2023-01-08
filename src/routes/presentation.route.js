import { Router } from 'express';
import verifyJWT from '../middleware/verifyJWT.js'
const router = Router();
import presentationController from '../controllers/presentation.controller.js';
router.post('/create', verifyJWT(), presentationController.create);
router.get('/', verifyJWT(), presentationController.getPresentations);
router.get('/getone', verifyJWT(), presentationController.getOne);
router.get('/get_slides_of_presentation', verifyJWT(), presentationController.getSlidesOfPresentation);
router.get('/get_slides_by_code', verifyJWT(), presentationController.getSlidesByCode);

router.post('/delete', verifyJWT(), presentationController.deleteOne);



export default router;

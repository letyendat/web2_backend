import { Router } from 'express';
import verifyJWT from '../middleware/verifyJWT.js'
const router = Router();
import groupController from '../controllers/group.controller.js';
router.post('/create', verifyJWT(), groupController.create);
router.get('/', verifyJWT(), groupController.getGroups);
router.get('/invite', verifyJWT(), groupController.joinGroup);
router.get('/create_link', verifyJWT(), groupController.createInvitationLink);
router.get('/send_link', verifyJWT(), groupController.sendInvitationLink);
router.get('/getone', verifyJWT(), groupController.getOne);
router.get('/get_all_member', verifyJWT(), groupController.getAllMembers);
router.delete('/delete', verifyJWT(), groupController.deleteMember);
export default router;

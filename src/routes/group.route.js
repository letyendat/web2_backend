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
router.delete('/delete_member', verifyJWT(), groupController.deleteMember);
router.delete('/delete_group', verifyJWT(), groupController.deleteGroup);
router.put('/update_role', verifyJWT(), groupController.updateRole);

export default router;

import {Router} from 'express';
const router = Router();

import {getUsers,getUsersById, createUsers, updateUserById, deleteUserById} from "../controllers/generalController";

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users', createUsers);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);

export default router;
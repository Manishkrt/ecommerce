import express from 'express';
import {getuser, createuser, login} from '../controller/user.js'


const router = express.Router();

router.post('/', createuser)
router.get('/', getuser)
router.post('/login', login)

export default router
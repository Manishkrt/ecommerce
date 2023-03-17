import express from 'express';
import {getseller, createseller, login} from '../controller/seller.js'


const router = express.Router();

router.get('/', getseller)
router.post('/', createseller)
router.post('/login', login )

export default router

import express from 'express'
import {add, login} from '../controller/admin.js'

const router = express.Router()

router.post('/', add)
router.post('/login', login)

export default router
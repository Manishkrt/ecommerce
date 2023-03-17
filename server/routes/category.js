import express from 'express';
import {createcategory, getcategory} from '../controller/category.js'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })


const router = express.Router();

router.post('/', upload.fields([{name :"icon", maxCount: 1 }, {name : "image", maxCount: 1}]), createcategory)
router.get('/', getcategory)

export default router
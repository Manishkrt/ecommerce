import express from 'express'; 
import {add, show, update, editproduct, deleteproduct} from '../controller/product.js'
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

router.post('/', upload.single("image"),  add) 
router.get('/',  show) 
router.get('/:id',  editproduct) 
router.post('/:id', upload.single("image"),  update) 
router.delete('/:id',  deleteproduct)   

export default router











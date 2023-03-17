import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import './connection/connection.js'
import sellerroute from './routes/seller.js'
import userroute from './routes/user.js'
import categoryroute from './routes/category.js'
import productroute from './routes/product.js'
import adminroute from './routes/admin.js'

dotenv.config();
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;  
const app = express();
 
// middle ware 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname,'/')));
app.use("/public", express.static(__dirname + '/public'));


// routes 

app.use('/seller',  sellerroute)
app.use('/user',  userroute)
app.use('/category',  categoryroute)
app.use('/product',  productroute)
app.use('/admin',  adminroute)

  
// server port 
app.listen(PORT, (req, res)=>{
    console.log("server is started on port " + PORT); 
});
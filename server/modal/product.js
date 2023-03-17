import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    product_name: {
        type: 'string',
        required: true,
    },
    product_detail: {
        type: 'string',
        required: true,
    },
    company: {
        type: 'string',
        required: true,
    },
    category: {
        type: 'string',
        required: true,
    },
    price: {
        type: 'string',
        required: true,
    },
    offer: {
        type: 'string',
        required: true,
    },
    replacement: {
        type: 'string',
        required: true,
    },
    image: {
        type: 'string',
        required: true,
    },
    seller_id: {
        type: 'string',
        required: true,
    },
    warranty: {
        type: 'string',
        required: true,
    },
    
},
{
    timestamps: true
}

)

const Product = mongoose.model('product', productSchema)

export default Product
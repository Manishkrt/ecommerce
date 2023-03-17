import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        unique: true
    },
    icon: {
        type: 'string',
        required: true,
    },
    
    image: {
        type: 'string',
        required: true,
    }
    },
    {timestamps: true}
); 

const Category = mongoose.model('category', sellerSchema);

export default Category 
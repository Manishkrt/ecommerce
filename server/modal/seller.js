import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    company: {
        type: 'string',
        required: true,
        unique: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
    },
    
    phone: {
        type: 'string',
        required: true,
    }
    },
    {timestamps: true}
); 

const seller = mongoose.model('seller', sellerSchema);

export default seller 
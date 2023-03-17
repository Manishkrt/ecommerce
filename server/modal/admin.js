import mongoose from 'mongoose';

const adminschema = new mongoose.Schema({
    name : {
        type : 'string',
        required : true
    },
    email : {
        type : 'string',
        required : true,
        unique: true
    },
    password : {
        type : 'string',
        required : true
    }
}, { timestamps: true }

)

const Admin = mongoose.model('admin', adminschema)


export default Admin
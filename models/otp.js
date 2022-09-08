const mongoose = require('mongoose');
const Schema = mongoose.Schema

const otpSchema = new Schema({
    number:{
        type: String,
        required:true
    },
    otp:{
        type: String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now,
        index:{
            expires:10
        }
    },  
}, {timestamps: true})

const Otp = mongoose.model('Otp',otpSchema)
module.exports = Otp
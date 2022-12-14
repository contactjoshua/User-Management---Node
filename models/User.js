const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required:true,
        max:32
    },
    email: {
        type: String
        
    },
    phone: {
        type: String,
        required:true,
        unique:true
        
    },
    password: {
        type: String
        
    },
    resetLink: {
        data: String,
        default: ""
    }
},{timestamps:true})

const User = mongoose.model('user',userSchema)
module.exports = User
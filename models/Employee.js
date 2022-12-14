const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true  
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    photo: {
        type: String
    }

},{timestamps:true})

const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee